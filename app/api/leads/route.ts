import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

import { leadIntakeSchema } from "@/lib/lead";
import { getLeadPhotoBucket, getSupabaseServiceClient } from "@/lib/supabase";

function readText(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getLeadOrganizationId() {
  const value = process.env.HDZ_LEAD_ORGANIZATION_ID;
  if (!value || !value.trim()) return null;
  return value.trim();
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const payload = {
      tenantSlug: readText(formData, "tenantSlug") || "hdz",
      name: readText(formData, "name"),
      phone: readText(formData, "phone"),
      email: readText(formData, "email"),
      propertyAddress: readText(formData, "propertyAddress"),
      servicesRequested: formData.getAll("servicesRequested").map((v) => String(v).trim()).filter(Boolean),
      projectDescription: readText(formData, "projectDescription"),
      timeline: readText(formData, "timeline"),
      budgetRange: readText(formData, "budgetRange"),
      preferredContactMethod: readText(formData, "preferredContactMethod"),
    };

    const parsed = leadIntakeSchema.safeParse(payload);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid form input." }, { status: 400 });
    }

    const supabase = getSupabaseServiceClient();
    const organizationId = getLeadOrganizationId();
    const now = new Date().toISOString();

    const leadInsert = await supabase
      .from("leads")
      .insert({
        organization_id: organizationId,
        tenant_slug: parsed.data.tenantSlug,
        source: "hdz-landing",
        status: "new",
        name: parsed.data.name,
        phone: parsed.data.phone,
        email: parsed.data.email || null,
        property_address: parsed.data.propertyAddress,
        services_requested: parsed.data.servicesRequested,
        project_description: parsed.data.projectDescription,
        timeline: parsed.data.timeline,
        budget_range: parsed.data.budgetRange,
        preferred_contact_method: parsed.data.preferredContactMethod,
        created_at: now,
        updated_at: now,
      })
      .select("id")
      .single();

    if (leadInsert.error || !leadInsert.data?.id) {
      return NextResponse.json({ error: leadInsert.error?.message ?? "Failed to save lead." }, { status: 500 });
    }

    const files = formData.getAll("photos").filter((entry): entry is File => entry instanceof File && entry.size > 0);

    if (files.length > 0) {
      const leadPhotoBucket = getLeadPhotoBucket();

      for (const file of files.slice(0, 8)) {
        const extension = (file.name.split(".").pop() || "jpg").toLowerCase();
        const filePath = `${leadInsert.data.id}/${randomUUID()}.${extension}`;

        const uploadResult = await supabase.storage.from(leadPhotoBucket).upload(filePath, file, {
          contentType: file.type || "image/jpeg",
          upsert: false,
        });

        if (uploadResult.error) {
          return NextResponse.json({ error: `Photo upload failed: ${uploadResult.error.message}` }, { status: 500 });
        }

        const photoInsert = await supabase.from("lead_photos").insert({
          lead_id: leadInsert.data.id,
          storage_path: filePath,
          caption: null,
          created_at: now,
        });

        if (photoInsert.error) {
          return NextResponse.json({ error: `Failed to save lead photo: ${photoInsert.error.message}` }, { status: 500 });
        }
      }
    }

    return NextResponse.json({ ok: true, leadId: leadInsert.data.id });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unexpected server error." },
      { status: 500 },
    );
  }
}
