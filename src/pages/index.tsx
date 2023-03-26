import { useEffect } from 'react';
import axios from 'axios';
import tw from 'twin.macro';
import styled from '@emotion/styled';
import { Button } from 'antd';

export default function Home() {
  const fetchData = async () => {
    try {
      const res = await axios({
        method: 'get',
        url: '/orders',
      });

      if (res.status === 200) {
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="flex flex-col border border-red-500 bg-light">
      헬로월드
      <Input placeholder="box" />
      <MyDiv>Test Text</MyDiv>
      <Button type="primary">Button</Button>
    </main>
  );
}

const height = '72px';

const Input = tw.input`
    text-center border h-[${height}] bg-gray-200
`;
const MyDiv = styled.div`
  background: gold;
  font-size: 2rem;
  margin-top: 10px;
`;
