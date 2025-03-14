import { Controller, Control } from 'react-hook-form';
import CurrencyInput from 'react-currency-input-field';

interface CurrencyInputProps {
  name: string;
  control: Control<any>;
  prefix?: string;
  decimalSeparator?: string;
  groupSeparator?: string;
  decimalsLimit?: number;
}

const CustomCurrencyInput: React.FC<CurrencyInputProps> = ({
  name,
  control,
  prefix = '¥',
  decimalSeparator = '.',
  groupSeparator = ',',
  decimalsLimit = 0,
}) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { onChange, value }, fieldState: { error } }) => (
      <div>
        <CurrencyInput
          value={value}
          onValueChange={onChange}
          prefix={prefix}
          decimalSeparator={decimalSeparator}
          groupSeparator={groupSeparator}
          decimalsLimit={decimalsLimit}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
      </div>
    )}
  />
);

export default CustomCurrencyInput;
