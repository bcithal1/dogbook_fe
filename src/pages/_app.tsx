import { SessionProvider } from "next-auth/react";
// import "@/styles/globals.css";
import { Grid } from "@mui/material";
// eslint-disable-next-line import/no-extraneous-dependencies
import { makeStyles } from "@material-ui/core/styles";
// eslint-disable-next-line import/extensions
import DogCard from "@/components/DogCard";

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "21px",
    paddingRight: "21px",
  },
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const myStyle = useStyles();
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      <Grid container className={myStyle.gridContainer}>
        <Grid item spacing={3} xs={12} sm={6} md={4}>
          <DogCard />
        </Grid>

        <Grid item spacing={3} xs={12} sm={6} md={4}>
          <DogCard />
        </Grid>

        <Grid item spacing={3} xs={12} sm={6} md={4}>
          <DogCard />
        </Grid>
      </Grid>
    </SessionProvider>
  );
}
