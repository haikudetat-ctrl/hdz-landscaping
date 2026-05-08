import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceKey) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const bucket = "marketing-assets";
const localPath = path.resolve("public/images/hdz-hero-stock1-2200.jpg");
const remotePath = "hdz/hero/hdz-hero-stock1-2200.jpg";

const file = fs.readFileSync(localPath);

const { error: uploadError } = await supabase.storage
  .from(bucket)
  .upload(remotePath, file, {
    contentType: "image/jpeg",
    cacheControl: "31536000",
    upsert: true,
  });
if (uploadError) throw uploadError;

const { data } = supabase.storage.from(bucket).getPublicUrl(remotePath);
console.log(data.publicUrl);
