import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";

// const store = configureStore({
//   reducer: {
//     totalPrice: totalPriceReducer,
//   },
// });

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;

function MyApp({ Component, pageProps }: any) {
  return (
    // <Provider store={store}>
    <ChakraProvider resetCSS theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
    // </Provider>
  );
}

export default MyApp;
