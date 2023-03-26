import styled from '@emotion/styled';

export default function Home() {
  return (
    <main className="m-2 flex border border-red-500 p-2">
      NextJS-APP
      <Button>button</Button>
    </main>
  );
}

const Button = styled.button`
  background-color: blueviolet;
`;
