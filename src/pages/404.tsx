import React, { FunctionComponent } from 'react';
import {
  EuiButton,
  EuiEmptyPrompt,
  EuiPageTemplate,
  EuiImage,
} from '@elastic/eui';
import { useRouter } from 'next/router';

const NotFoundPage: FunctionComponent = () => {


  const router = useRouter();

  const handleClick = e => {
    e.preventDefault();
    router.back();
  };

  return (
    <EuiPageTemplate template="empty">
      <EuiEmptyPrompt
        actions={[
          <EuiButton
            color="primary"
            fill
            onClick={handleClick}
            key="404-go-back">
            Go back
          </EuiButton>,
        ]}
        body={
          <p>
            Sorry, we can&apos;t find the page you&apos;re looking for. It might
            have been removed or renamed, or maybe it never existed.
          </p>
        }
        layout="vertical"
        title={<h2>Page not found</h2>}
        titleSize="m"
      />
    </EuiPageTemplate>
  );
};

export default NotFoundPage;
