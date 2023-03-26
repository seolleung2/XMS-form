import styled from '@emotion/styled';
import tw from 'twin.macro';

export default function Home() {
  return (
    <main className="flex flex-col border border-red-500 bg-light">
      헬로월드
      <Input placeholder="box" />
      <MyDiv>Test Text</MyDiv>
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
