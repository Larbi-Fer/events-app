'use client'

// Note: `useUploadThing` is IMPORTED FROM YOUR CODEBASE using the `generateReactHelpers` function
import { useDropzone } from "@uploadthing/react";
import { useCallback } from "react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { convertFileToUrl } from '@utils'

function IconUploader({ imageUrl, onFieldChange, setFiles, text } : { imageUrl: '', onFieldChange: (url: string) => any, text: '', setFiles: (x: any) => any }) {
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
    <div {...getRootProps()} className="drop-zone icon" style={{margin: 'auto', overflow: 'hidden'}}>
      <div>
        <input {...getInputProps()} />
        {imageUrl ? (
          <div>
            <img src={imageUrl} alt="Image" className="icon" style={{margin: '0'}} />
          </div>
        ) : <div> Drop your icon here! </div>}
      </div>
    </div>
  );
}

export default IconUploader