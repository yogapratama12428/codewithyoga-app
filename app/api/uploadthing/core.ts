import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const handleAuth = async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if(!user ) throw new Error("Unauthorized");
    return { user }
}

export const ourFileRouter = {
    courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
      .middleware(() => handleAuth())
      .onUploadComplete(async({metadata, file}) => {
        console.log("Upload complete for userId:", metadata.user.id);
        console.log("file url", file.url);

        return file.url
      }),
    courseAttachment: f(["text", "image", "video", "audio", "pdf"])
      .middleware(() => handleAuth())
      .onUploadComplete(async({metadata, file}) => {
        console.log("Upload complete for userId:", metadata.user.id);
        console.log("file url", file.url);

        return file.url
      }),
    chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: "512GB" } })
      .middleware(() => handleAuth())
      .onUploadComplete(async({metadata, file}) => {
        console.log("Upload complete for userId:", metadata.user.id);
        console.log("file url", file.url);

        return file.url
      })
  } satisfies FileRouter;

  export type OurFileRouter = typeof ourFileRouter;