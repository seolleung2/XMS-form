import React, { FunctionComponent, useState } from 'react';
import { Table as AntdTable } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useFormContext } from 'react-hook-form';
import styled from '@emotion/styled';
import Button from 'components/button';
import Modal from 'components/modal';
import { ResponseType, OrderFields as DataType, PageType } from 'types/form';

interface TableProps {
  isLoading: boolean;
  selectedRowKeys: number[];
  tableData: ResponseType | undefined;
  searchInfo: PageType;
  setSelectedRowKeys: React.Dispatch<React.SetStateAction<number[]>>;
  setSearchInfo: React.Dispatch<React.SetStateAction<PageType>>;
}

const ReceicivingCompleteTable: FunctionComponent<TableProps> = ({
  isLoading,
  tableData,
  selectedRowKeys,
  searchInfo,
  setSelectedRowKeys,
  setSearchInfo,
}: TableProps) => {
  const [isDisabledDeleteBtn, setIsDisabledDeleteBtn] =
    useState<boolean>(false);
  const [responseModalOpen, setResponseModalOpen] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState<string>('');

  const methods = useFormContext();
  const { reset } = methods;

  const handleCloseResponseModal = () => {
    setResponseModalOpen(false);
    setResponseMessage('');
  };

  const handleDeleteOrder = () => {
    console.log('selectedRowKeys', selectedRowKeys);
  };

  const handlePage = async (page: number) => {
    setSelectedRowKeys([]);
    setSearchInfo((prevState) => {
      return { ...prevState, page };
    });
  };

  const onSelectChange = (record: any) => {
    setSelectedRowKeys(record);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns: ColumnsType<DataType> = [
    {
      title: '이름',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      render: (text: string) => {
        return text || '-';
      },
    },
    {
      title: '휴대폰번호',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      fixed: 'left',
      render: (text: string) => {
        return text || '-';
      },
    },
    {
      title: '날짜',
      dataIndex: 'date',
      key: 'date',
      fixed: 'left',
      render: (_: string, record: DataType) => {
        const { fromDate, toDate } = record;
        return `${fromDate} ~ ${toDate}`;
      },
    },
    {
      title: '품목',
      dataIndex: 'item',
      key: 'item',
      render: (_: string, record: DataType) => {
        const { item, itemDetail } = record;
        return item !== '직접입력' ? item || '-' : itemDetail || '-';
      },
    },
    {
      title: '단위',
      dataIndex: 'supply',
      key: 'supply',
      render: (text: string) => {
        return text || '-';
      },
    },
    {
      title: '물량',
      dataIndex: 'supplyDetail',
      key: 'supplyDetail',
      render: (text: string) => {
        return text || '-';
      },
    },
    {
      title: '출근지',
      dataIndex: 'address',
      key: 'address',
      render: (text: string) => {
        return text || '-';
      },
    },
    {
      title: '오더복사',
      dataIndex: 'copyOrder',
      key: 'copyOrder',
      fixed: 'right',
      render: (_: string, record: DataType) => {
        return (
          <span
            className="cursor-pointer underline hover:text-blue-500"
            onClick={() => {
              reset(record);
            }}
          >
            오더복사
          </span>
        );
      },
    },
  ];

  return (
    <>
      <TableWrapper>
        <Button
          type="button"
          text="삭제"
          className="absolute right-0 -top-11 z-10"
          handleClick={handleDeleteOrder}
          disabled={isDisabledDeleteBtn}
        />
        <AntdTable
          loading={isLoading}
          rowKey="seqNo"
          columns={columns}
          dataSource={tableData?.orders}
          tableLayout="fixed"
          bordered={false}
          size="small"
          pagination={{
            onChange: handlePage,
            position: ['bottomCenter'],
            defaultCurrent: 1,
            current: searchInfo.page,
            pageSize: searchInfo.size,
            total: tableData?.total || 0,
            defaultPageSize: 20,
            pageSizeOptions: [20, 50, 100],
            onShowSizeChange: (_, size) => {
              setSelectedRowKeys([]);
              setSearchInfo((prevState) => {
                return { ...prevState, page: 1, size };
              });
            },
          }}
          scroll={{ x: 768, y: 500 }}
          rowSelection={rowSelection}
        />
      </TableWrapper>
      {responseModalOpen && responseMessage && (
        <Modal title="요청 성공" onClose={handleCloseResponseModal}>
          <div className="flex flex-col space-y-4 px-4 py-6">
            <h3 className="text-lg font-semibold">삭제가 완료 되었습니다.</h3>
            <p className="h-30 w-72 break-all line-clamp-3">
              {responseMessage}
            </p>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ReceicivingCompleteTable;

const TableWrapper = styled.div`
  position: relative;
  -webkit-box-shadow: 0px 0px 6px 0px rgb(0 0 0 / 10%);
  box-shadow: 0px 0px 6px 0px rgb(0 0 0 / 10%);

  .ant-table-tbody {
    cursor: pointer;
  }

  .ant-table-thead {
    font-size: 0.75rem;

    .ant-table-cell {
      text-align: center;
      font-weight: bold;
      background: ${({ theme }) => theme.colors.disabled};
      border-bottom: 1px solid ${({ theme }) => theme.colors['secondary-gray']};
    }

    .ant-table-cell::before {
      all: unset;
    }
  }

  .ant-table-tbody {
    font-size: 0.75rem;
  }

  .ant-table-cell {
    text-align: center;
    padding: 4px !important;
  }

  .ant-table-thead > tr > th {
    height: 38px;
    color: rgba(0, 0, 0, 0.85);
    background: #fafafa;
    transition: background 0.3s ease;
  }

  .ant-table-tbody > tr > td {
    transition: background 0.3s;
  }

  .ant-table-tbody > tr.ant-table-row-selected > td {
    background: #e6f7ff;
    border-color: #abd4fc;
  }

  ul.ant-pagination {
    .ant-pagination-prev,
    .ant-pagination-next {
      .ant-pagination-item-link {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
`;
