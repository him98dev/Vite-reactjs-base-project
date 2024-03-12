import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../state/store';
import { decrement, incrementAsync } from '../state/counter/counterSlice';
import { Button, Flex } from 'antd';

const Counter = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <h2>{count}</h2>
      <Flex gap={12}>
        <Button type='primary' onClick={() => dispatch(incrementAsync(10))}>
          Increment
        </Button>
        <Button type='primary' onClick={() => dispatch(decrement())}>
          Decrement
        </Button>
      </Flex>
    </div>
  );
};

export default Counter;
