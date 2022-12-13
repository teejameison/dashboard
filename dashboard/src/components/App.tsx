import { useEffect, useState } from 'react';
import { Table } from './Table/Table';
import { BarChart } from './BarChart/BarChart';
import { addDays, format } from 'date-fns';
import { DateRange, DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { Source, TableData } from 'utils/types';

const App = () => {
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [tableHeaders, setTableHeaders] = useState<string[]>([]);
  const pastMonth = new Date();
  const defaultSelected: DateRange = {
    from: pastMonth || '',
    to: addDays(pastMonth, 3) || ''
  };
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);
  let footer = <p>Please pick the first day.</p>;
  if (range?.from) {
    if (!range.to) {
      footer = <p>{format(range.from, 'PPP')}</p>;
    } else if (range.to) {
      footer = (
        <p className="pl-2 text-lg">
          {format(range.from, 'PP')}–{format(range.to, 'PP')}
        </p>
      );
    }
  }

  useEffect(() => {
    const url = `http://localhost:3000/api/?size=3000&q=timestamp:[${format(range.from, 'yyyy-MM-dd')}+TO+${format(range.to, 'yyyy-MM-dd')}]`;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();

        const newTableData: TableData[] = json.hits.hits?.map((tableItem: TableData) => {
          const { geo, machine, tags, ...rest } = tableItem._source;

          const finalObj = {
            ...rest,
            srcdest: tableItem._source.geo.srcdest,
            machine: tableItem._source.machine.os,
            tags: tableItem._source.tags.join(', '),
          };

          return finalObj;
        });

        setTableData(newTableData);
        newTableData.length && setTableHeaders(Object.keys(newTableData[0]));
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchData();
  }, [range]);

  

  return (
    <div className="bg-gray-900 text-white">
      <div className="mx-auto max-w-screen-xl py-8 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className='flex justify-between flex-wrap'>
          <div>
            <h2 className="pt-4 text-base font-semibold uppercase tracking-wide text-blue-600">
              Welcome to
            </h2>
            <p className="my-3 text-4xl font-bold text-gray-300 sm:text-5xl sm:tracking-tight lg:text-6xl">
              The Dashboard
            </p>
          </div>
          <DayPicker
            mode="range"
            defaultMonth={pastMonth}
            selected={range}
            onSelect={setRange}
            footer={footer}
          />
        </div>
        {range && (
          <>
            <BarChart tableData={tableData} />
            <Table rows={tableData} columns={tableHeaders} />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
