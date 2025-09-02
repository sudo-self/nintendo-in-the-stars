//app/api/roms/route.js


import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../../../lib/firebase";

export async function GET() {
  try {
    const romsRef = ref(storage, "roms");
    const snapshot = await listAll(romsRef);

    if (!snapshot.items.length) {
      return new Response(
        JSON.stringify({ error: "No ROMs found." }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    const romFiles = await Promise.all(
      snapshot.items.map(async (item) => {
        const url = await getDownloadURL(item);
        return { name: item.name, url };
      })
    );

    return new Response(JSON.stringify({ roms: romFiles }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to fetch ROMs." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

