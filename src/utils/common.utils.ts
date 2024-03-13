import { AxiosError } from 'axios';
import { TypeCommon } from '../types/common';

export const handleError = (
  error: AxiosError<TypeCommon>,
  rejectWithValue: (value: unknown) => TypeCommon,
  includeStatus?: boolean
): TypeCommon => {
  const err: AxiosError<TypeCommon> = error;
  if (!err.response) {
    throw err;
  }
  if (includeStatus) return rejectWithValue(err.response || err.message);
  return rejectWithValue(err.response.data || err.message);
};
