const config = {
    baseUrl: "https://money-manager-backend-sa.herokuapp.com/",
    endpoints: {
        login: "login",
        register: "register",
        verifyToken: "verify_token&get_user_details",
        getIncome: "get_income",
        addIncome: "add_income",
        updateIncome: "update_income",
        addExpense: "add_expense"
    }

};
export default config;