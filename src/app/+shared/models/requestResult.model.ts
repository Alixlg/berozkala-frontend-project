export interface RequestResultModel<TBody> {
  isSuccess: boolean;
  statusCode: number;
  message: string;
  body: TBody;
}
