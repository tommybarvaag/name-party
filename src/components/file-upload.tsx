"use client";

import sanity from "@/lib/sanity";
import { ChangeEvent, useMemo, useState } from "react";

const FileUpload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [progress, setProgress] = useState<number>(0);

  function uploadSingleFile(e: ChangeEvent<HTMLInputElement>) {
    setFiles([...files, ...(e.target?.files ?? [])]);
  }

  function deleteFile(imageIndex: number) {
    const s = files.filter((item, index) => index !== imageIndex);
    setFiles(s);
  }

  const upload = async () => {
    const formData = new FormData();

    files.forEach((item) => {
      // post blob of file to server
      formData.append("files[]", item, item.name);
    });

    // batch insert images into Sanity
    // sleep for 500 milliseconds for every image uploaded
    // to avoid rate limiting
    for (let i = 0; i < files.length; i++) {
      const wtf = files[i];
      if (wtf) {
        const image = await sanity.assets
          .upload("image", wtf, {
            description: "image",
          })
          .then((res) => {
            sanity
              .patch(res._id)
              .set({
                altText: "test!!",
              })
              .commit();

            // post image to user
            fetch("/api/asset", {
              method: "POST",
              body: JSON.stringify({
                extension: res.extension,
                name: res.originalFilename,
                mimeType: res.mimeType,
                sanityId: res._id,
                uploadId: res.uploadId,
                url: res.url,
                createdAt: res._createdAt,
                updatedAt: res._updatedAt,
                userId: res.id,
              }),
            }).then((res) => {
              console.log(res);
            });

            return { res };
          })
          .catch((err) => console.error(err));

        setProgress(((i + 1) / files.length) * 100);
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }
  };

  const images = useMemo(
    () => (files ?? []).map((f) => URL.createObjectURL(f)),
    [files]
  );

  return (
    <>
      <div className="columns-3">
        {images.length > 0 &&
          images.map((item, index) => {
            return (
              <div key={item}>
                <img
                  src={item}
                  alt=""
                  className="aspect-square w-full object-cover"
                />
                <button type="button" onClick={() => deleteFile(index)}>
                  delete
                </button>
              </div>
            );
          })}
      </div>
      <form>
        <div className="form-group">
          <input
            type="file"
            disabled={files.length > 30}
            className="form-control"
            onChange={(e) => uploadSingleFile(e)}
            multiple
          />
        </div>
        <button
          type="button"
          className="btn btn-primary btn-block"
          onClick={async () => await upload()}
        >
          Upload
        </button>
      </form>
      {progress > 0 && <progress value={progress} max="100" />}
    </>
  );
};

export default FileUpload;
