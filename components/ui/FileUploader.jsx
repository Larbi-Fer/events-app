'use client'

// Note: `useUploadThing` is IMPORTED FROM YOUR CODEBASE using the `generateReactHelpers` function
import { useDropzone } from "@uploadthing/react";
import { useCallback } from "react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { convertFileToUrl } from '@utils'
import Button from "./Button";

function FileUploader({ imageUrl, onFieldChange, setFiles, text }) {
  // console.log(generateClientDropzoneAccept())
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
    onFieldChange(convertFileToUrl(acceptedFiles[0]));
  }, []);
 
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(['image/*']),
    multiple: false
  }); 
 
  return (
    <div {...getRootProps()} className="fullWidth drop-zone">
      <label>{text}</label>
      <div>
        <input {...getInputProps()} />
        {imageUrl ? (
          <div>
            <img src={imageUrl} alt="Image" />
            <Button round onClick={() => setFiles([]) || onFieldChange('')}>Delete</Button>
          </div>
        ) : <div> Drop files here! </div>}
      </div>
    </div>
  );
}

export default FileUploader