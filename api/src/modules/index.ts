import todoList from "./todo/list";
import userLogin from "./user-login";
import userRegister from "./user-register-email";
import userValidate from "./user-validate";

export const modules = {
  user: {
    login: {
      handler: userLogin.handler,
      middleware: userLogin.middleware,
    },
    register: {
      email: {
        handler: userRegister.handler,
        middleware: userRegister.middleware,
      },
    },
    validate: {
      handler: userValidate.handler,
      middleware: userValidate.middleware,
    },
  },
  todos: {
    list: {
      handler: todoList.handler,
      middleware: todoList.middleware,
    },
  },
};
