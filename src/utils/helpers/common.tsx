import { Tooltip } from 'antd';
import chalk from 'chalk';

function isEmpty(obj: Array<any> | object): boolean {
  if (!obj || typeof obj !== 'object') return !obj;

  if (Array.isArray(obj)) {
    return !obj.length;
  }

  return !Object.keys(obj).length;
}
const validatePassword = (password: string) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,64}$/;
  return passwordRegex.test(password);
};
const getInfoDevice = () => {
  const device = /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)
    ? 'MOBILE'
    : 'DESKTOP';
  const collapsed = device !== 'DESKTOP';

  return {
    device,
    collapsed,
  } as const;
};
const logger = ({
  message,
  type,
}: {
  message: string;
  type: 'ERROR' | 'INFO';
}) => {
  switch (type) {
    case 'ERROR':
      console.error(chalk.red(message));
      break;

    default:
      console.info(chalk.blue(message));
      break;
  }
};

const truncateText = (text: string) => {
  if (!text) return '';
  return (
    <p style={{ cursor: 'pointer', marginBottom: '0' }}>
      <Tooltip title={text}>
        {text.substring(0, 10) +
          '...' +
          text.substring(text.length - 6, text.length)}
      </Tooltip>
    </p>
  );
};
const convertToSlug = (value: string) => {
  return value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9/-]/g, '')
    .replace(/\//g, '-')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '');
};
const formatByEnUsNum = (value: number) => {
  if (isFloat(value)) {
    return value.toLocaleString('en-US', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 3,
    });
  }
  return value.toLocaleString('en-US');
};

function isFloat(n: number) {
  return Number(n) === n && n % 1 !== 0;
}

export {
  formatByEnUsNum,
  truncateText,
  isEmpty,
  logger,
  convertToSlug,
  isFloat,
  validatePassword,
  getInfoDevice,
};
