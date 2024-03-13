import { AxiosResponse } from 'axios';
import { deleteMethod, get, post, put } from '../base.service';

export interface ICreateUserBody {
  firstName: string;
  lastName: string;
  age: number;
}

export const listUsers = (): Promise<AxiosResponse> => {
  console.log('list user');
  return get({
    url: 'user/list'
  });
};

export const getUser = (id: string): Promise<AxiosResponse> => {
  return get({
    url: 'user',
    params: {
      id
    }
  });
};

export const createUser = (body: ICreateUserBody): Promise<AxiosResponse> => {
  return post({
    url: 'user/create',
    body
  });
};

export const updateUser = (id: string, body: Partial<ICreateUserBody>): Promise<AxiosResponse> => {
  return put({
    url: 'user/update',
    params: {
      id
    },
    body
  });
};

export const deleteUser = (id: string): Promise<AxiosResponse> => {
  return deleteMethod({
    url: '/user',
    params: {
      id
    }
  });
};
