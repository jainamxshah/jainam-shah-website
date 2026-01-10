export interface Stat {
  id: string;
  value: number;
  displayValue: string;
  label: string;
  suffix?: string;
}

export const stats: Stat[] = [
  {
    id: '1',
    value: 400,
    displayValue: '400',
    label: 'Average traffic increase',
    suffix: '%',
  },
  {
    id: '2',
    value: 50,
    displayValue: '50K',
    label: 'Users served',
    suffix: '+',
  },
  {
    id: '3',
    value: 15,
    displayValue: '15',
    label: 'Products launched',
    suffix: '+',
  },
  {
    id: '4',
    value: 98,
    displayValue: '98',
    label: 'Client satisfaction',
    suffix: '%',
  },
];

