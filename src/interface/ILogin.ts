export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginModal {
  show: boolean;
  setShow: (show: boolean) => void;
}
