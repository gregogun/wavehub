import { Protected } from '@/modules/auth/Protected';
import { UploadForm } from '@/modules/upload';
import { useCallback } from 'react';

const Upload = () => {
  return (
    <Protected>
      <UploadForm />
    </Protected>
  );
};

export default Upload;
