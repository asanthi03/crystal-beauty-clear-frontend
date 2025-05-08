import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://bqmzejbzmmsuvujjxrnf.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxbXplamJ6bW1zdXZ1amp4cm5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2ODgwMDQsImV4cCI6MjA2MTI2NDAwNH0.Z51v8298ejdd0oxNQFNjA93p0HDImSJoUb70GlSqUwQ");



export default function mediaUpload(file) {
    const promise = new Promise(
        (resolve, reject) => {
            if (file == null) {
                reject("No file selected")
            }
            const timestamp = new Date().getTime()
            const newFileName = timestamp + file.name

            supabase.storage.from("images").upload(newFileName, file, {
                cacheControl: "3600",
                upsert: false,
            }).then(
                ()=>{
                    const url = supabase.storage.from("images").getPublicUrl(newFileName).data.publicUrl
                    console.log(url)
                }
            )
        }
    )
}