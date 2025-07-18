import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import styled from "styled-components";

const Icon = styled.img`
  width: 10vw;
`;

const LoadingScreen: React.FC = () => {
  const [open] = React.useState<boolean>(true);

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme:any) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <Icon
          src="https://a.trellocdn.com/prgb/dist/images/header-logo-spirit-loading.87e1af770a49ce8e84e3.gif"
          alt="Loading..."
        />
      </Backdrop>
    </div>
  );
};

export default LoadingScreen;
