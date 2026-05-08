import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const bucket = "marketing-assets";
const localPath = path.resolve("public/images/hdz-hero-2200.jpg");
const remotePath = "hdz/hero/hdz-hero-2200.jpg";

const { data: buckets, error: listError } = await supabase.storage.listBuckets();
if (listError) throw listError;

if (!buckets?.some((b) => b.name === bucket)) {
  const { error: createError } = await supabase.storage.createBucket(bucket, {
    public: true,
    fileSizeLimit: 5 * 1024 * 1024,
    allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
  });
  if (createError) throw createError;
}

const file = fs.readFileSync(localPath);

const { error: uploadError } = await supabase.storage
  .from(bucket)
  .upload(remotePath, file, {
    contentType: "image/jpeg",
    cacheControl: "31536000",
    upsert: true,
  });
if (uploadError) throw uploadError;

const { data: publicData } = supabase.storage.from(bucket).getPublicUrl(remotePath);

console.log(publicData.publicUrl);
