import React, { createContext, useContext, useState } from "react";

export const TokenContext = createContext({});

export const useTokenContext = () => useContext(TokenContext);

export const Provider = ({ children }) => {
	const [token, setToken] = useState("");

	return (
		<TokenContext.Provider value={{ token, setToken }}>
			{children}
		</TokenContext.Provider>
	);
};
