import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Global } from "@emotion/react";
import { Common } from "./Styles/Common";
import { Reset } from "styled-reset";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider, useQueryClient } from "react-query";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<QueryClientProvider client={queryClient}>
		<RecoilRoot>
			<BrowserRouter>
				<Global styles={Common} />
				<Reset />
				<App />
			</BrowserRouter>
		</RecoilRoot>
	</QueryClientProvider>
);

reportWebVitals();
