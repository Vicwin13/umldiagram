

export interface IAuthPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: IAuthPayload;
    }
  }
}