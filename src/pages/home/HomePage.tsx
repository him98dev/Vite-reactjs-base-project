import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks/common.hooks';
import { TypeCommon } from '../../types/common';
import { userListThunk } from '../../state/user/userSlice';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const [users, setUsers] = useState<TypeCommon[]>([]);

  const fetchUsers = useCallback(async () => {
    try {
      const res: TypeCommon = await dispatch(userListThunk());
      return res.payload || [];
    } catch (error: TypeCommon) {
      console.error('🚀 ~ fetchUsers ~ error:', error);
      return [];
    }
  }, [dispatch]);

  useEffect(() => {
    fetchUsers().then((result) => {
      setUsers(result);
    });
  }, []);

  return (
    <div>
      {users}
      <h1>Home Page</h1>
    </div>
  );
}
