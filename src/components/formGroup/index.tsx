import React, { FunctionComponent, useState } from 'react';
import { FieldValues, useFormContext, useFieldArray } from 'react-hook-form';
import DaumPostcode from 'react-daum-postcode';
import dayjs from 'dayjs';
import styled from '@emotion/styled';
import Input from '@components/input';
import Button from '@components/button';
import Modal from '@components/modal';
import RangePicker from '@components/rangePicker';
import SelectInput from '@components/selectInput';
import DatePickerField from '@components/datePicker';
import { useAddOrderMutation } from 'hooks/api/orders';
import {
  ITEM_SELECTION,
  SUPPLY_SELECTION,
  DEFAULT_VALUES,
} from 'constant/form';
import { LoadPlaceFields, PageType } from 'types/form';
import { cls } from 'utils';

interface Props {
  setSearchInfo: React.Dispatch<React.SetStateAction<PageType>>;
}

const FormGroup: FunctionComponent<Props> = ({ setSearchInfo }) => {
  const methods = useFormContext();
  const {
    register,
    reset,
    handleSubmit,
    watch,
    clearErrors,
    setValue,
    control,
    formState: { isDirty, errors, isSubmitting },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'loadPlace',
  });

  const [isDisabledSubmitBtn, setIsDisabledSubmitBtn] =
    useState<boolean>(false);
  const [responseModalOpen, setResponseModalOpen] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState<string>('');
  const [openPostcode, setOpenPostcode] = useState<boolean>(false);
  const [addressInputId, setAddressInputId] = useState<string>('');
  const [itemField, itemDetailField] = watch(['item', 'itemDetail']);
  const [supplyField, supplyDetailField] = watch(['supply', 'supplyDetail']);

  const { mutate } = useAddOrderMutation((response) => {
    if (response.success) {
      initializeFormStatus();
      const { data } = response;
      setResponseModalOpen(true);
      setResponseMessage(JSON.stringify(data));
    }
  });

  const initializeFormStatus = () => {
    reset(DEFAULT_VALUES);
  };

  const onSubmit = async (data: FieldValues) => {
    const {
      name,
      phoneNumber,
      fromDate,
      toDate,
      item,
      itemDetail,
      supply,
      supplyDetail,
      address,
      loadPlace,
    } = data;

    const fromDateString = dayjs(fromDate).toISOString().split('T')[0];
    const toDateString = dayjs(toDate).toISOString().split('T')[0];

    const loadingPlaceConversion = loadPlace.map(
      (placeInfo: LoadPlaceFields) => {
        const { date } = placeInfo;
        const convertedDate = dayjs(date).toISOString().split('T')[0];

        return {
          ...placeInfo,
          date: convertedDate,
        };
      }
    );

    const body = {
      name,
      phoneNumber,
      fromDate: fromDateString,
      toDate: toDateString,
      item,
      itemDetail,
      supply,
      supplyDetail,
      address,
      loadPlace: loadingPlaceConversion,
    };

    mutate(body);
    setSearchInfo((prevState) => {
      return { ...prevState, page: 1 };
    });
    await new Promise((r) => setTimeout(r, 1000));
    remove([1, 2]);
    setIsDisabledSubmitBtn(false);
  };

  const handleOpenPostcodeModal = (addressId: string) => {
    setAddressInputId(addressId);
    setOpenPostcode(true);
  };

  const handleCloseResponseModal = () => {
    setResponseModalOpen(false);
    setResponseMessage('');
  };

  const handleSelectAddress = (address: { roadAddress: string }) => {
    setValue(addressInputId as any, address.roadAddress);
    clearErrors(addressInputId as any);
    setOpenPostcode(false);
    setAddressInputId('');
  };

  const handleClosePostcodeModal = () => {
    setOpenPostcode(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(async (data) => {
          setIsDisabledSubmitBtn(true);
          await new Promise((r) => setTimeout(r, 1000));
          try {
            onSubmit(data);
          } catch (error) {
            setIsDisabledSubmitBtn(false);
            console.log(error);
          }
        })}
      >
        <div className="formGroup">
          <div className="flex flex-col flex-wrap space-y-4 lg:flex-row lg:flex-nowrap lg:space-x-6 lg:space-y-0">
            <div className="lg:w-1/3">
              <Input
                label="이름"
                id="name"
                className="mb-4"
                autoFocus
                maxLength={20}
                aria-invalid={
                  !isDirty ? undefined : errors.name ? 'true' : 'false'
                }
                message={errors['name']?.message as string}
                {...register('name', {
                  required: '값을 입력 해주세요.',
                  validate: (value) => {
                    const check = /^[가-힣a-zA-Z\s]+$/;

                    if (!check.test(value))
                      return '한글, 영어, 공백만 입력 가능 합니다.';
                  },
                })}
              />
              <Input
                label="휴대폰 번호"
                id="phoneNumber"
                className="mb-4"
                maxLength={13}
                aria-invalid={
                  !isDirty ? undefined : errors.name ? 'true' : 'false'
                }
                message={errors['phoneNumber']?.message as string}
                {...register('phoneNumber', {
                  required: '값을 입력 해주세요.',
                  validate: (value) => {
                    const check = /^([0-9]{3})-?([0-9]{4})-?([0-9]{4})$/;

                    if (!check.test(value))
                      return '알맞는 핸드폰 번호 형식을 입력 해주세요.';

                    setValue(
                      'phoneNumber',
                      value
                        .replace(/^(\d{3})(\d{4})(\d{4})$/g, '$1-$2-$3')
                        .replace(/-{1,2}$/g, '')
                    );
                  },
                })}
              />
              <RangePicker label="날짜" className="mb-4" />
              <SelectInput
                label="품목"
                className="mb-4"
                item="item"
                itemDetail="itemDetail"
                itemField={itemField}
                itemDetailField={itemDetailField}
                options={ITEM_SELECTION}
              />
              <SelectInput
                label="물량"
                className="mb-4"
                item="supply"
                itemDetail="supplyDetail"
                itemField={supplyField}
                itemDetailField={supplyDetailField}
                options={SUPPLY_SELECTION}
              />
              <Input
                label="출근지"
                id="address"
                className="mb-4"
                readOnly
                aria-invalid={
                  !isDirty ? undefined : errors.address ? 'true' : 'false'
                }
                message={errors['address']?.message as string}
                onClick={() => handleOpenPostcodeModal('address')}
                {...register('address', {
                  required: '값을 입력 해주세요.',
                })}
              />
            </div>
            <div className="loadPlaceWrapper flex grow flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4 lg:items-center">
              {fields.map((field, index) => {
                const loadPlaceErrors = errors['loadPlace'] as
                  | FieldValues
                  | undefined;

                return (
                  <LoadPlaceInfo
                    key={field.id}
                    className="relative h-fit w-full rounded-md p-2 lg:flex lg:flex-col lg:justify-center lg:py-8 lg:px-4"
                  >
                    <h3 className="mb-4">상차지 정보</h3>
                    <span
                      className={cls(
                        'absolute top-2 right-2 cursor-pointer py-0.5 px-2 text-red hover:font-bold lg:top-7',
                        index < 1 ? 'hidden' : 'block'
                      )}
                      onClick={() => remove(index)}
                    >
                      X
                    </span>
                    <Input
                      label="담당자"
                      id={`loadPlace.${index}.name`}
                      className="mb-4 px-2.5 md:px-0"
                      maxLength={10}
                      aria-invalid={
                        !isDirty || !loadPlaceErrors
                          ? undefined
                          : loadPlaceErrors[index]?.name
                          ? 'true'
                          : 'false'
                      }
                      message={
                        loadPlaceErrors && loadPlaceErrors[index]?.name?.message
                      }
                      {...register(`loadPlace.${index}.name`, {
                        required: '값을 입력 해주세요.',
                        validate: (value) => {
                          const check = /^[가-힣a-zA-Z\s]+$/;

                          if (!check.test(value))
                            return '한글, 영어, 공백만 입력 가능 합니다.';
                        },
                      })}
                    />
                    <DatePickerField
                      name={`loadPlace.${index}.date`}
                      className="mb-4 px-2.5 md:px-0"
                    />
                    <Input
                      label="상차지"
                      id={`loadPlace.${index}.address`}
                      className="mb-4 px-2.5 md:px-0"
                      readOnly
                      aria-invalid={
                        !isDirty || !loadPlaceErrors
                          ? undefined
                          : loadPlaceErrors[index]?.address
                          ? 'true'
                          : 'false'
                      }
                      message={
                        loadPlaceErrors &&
                        loadPlaceErrors[index]?.address?.message
                      }
                      onClick={() =>
                        handleOpenPostcodeModal(`loadPlace.${index}.address`)
                      }
                      {...register(`loadPlace.${index}.address`, {
                        required: '값을 입력 해주세요.',
                      })}
                    />
                  </LoadPlaceInfo>
                );
              })}
              <AddLoadPlaceInfo
                totalFields={fields.length}
                onClick={() =>
                  append({
                    name: '',
                    address: '',
                    date: 0,
                  })
                }
              >
                <span>+</span>
              </AddLoadPlaceInfo>
            </div>
          </div>
        </div>
        <div className="addButton mt-1.5">
          <Button
            text="등록"
            className=""
            disabled={isSubmitting || isDisabledSubmitBtn}
          />
        </div>
      </form>
      {openPostcode && (
        <Modal title="주소 검색" onClose={handleClosePostcodeModal}>
          <DaumPostcode
            onComplete={handleSelectAddress}
            style={{
              width: '100%',
              height: 530,
              padding: '24px',
            }}
          />
        </Modal>
      )}
      {responseModalOpen && responseMessage && (
        <Modal title="요청 성공" onClose={handleCloseResponseModal}>
          <div className="flex flex-col space-y-4 px-4 py-6">
            <h3 className="text-lg font-semibold">등록이 완료 되었습니다.</h3>
            <div>{responseMessage}</div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default FormGroup;

const LoadPlaceInfo = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray};
`;

const AddLoadPlaceInfo = styled.div<{ totalFields: number }>`
  display: ${({ totalFields }) => (totalFields < 3 ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  width: 100%;
  cursor: pointer;
  padding: 6px 0;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 6px;

  span {
    font-size: 32px;
    font-weight: semibold;
    color: 1px solid ${({ theme }) => theme.colors.primary};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.light};
  }

  @media (min-width: 1024px) {
    height: 314px;
  }
`;
