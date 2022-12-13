export interface TableData {
  _index:  string;
  _type:   string;
  _id:     string;
  _score:  number;
  _source: Source;
}

export interface Source {
  agent:     string;
  bytes:     number;
  clientip:  string;
  extension: string;
  geo:       Geo;
  host:      string;
  index:     string;
  ip:        string;
  machine:   Machine;
  memory:    number|null;
  message:   string;
  phpmemory: number|null;
  referer:   string;
  request:   string;
  response:  number;
  tags:      string[];
  timestamp: string;
  url:       string;
  utc_time:  string;
}

export interface Geo {
  srcdest:     string;
  src:         string;
  dest:        string;
  coordinates: Coordinates;
}

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface Machine {
  ram: number;
  os:  string;
}
