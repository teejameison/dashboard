# Elasticsearch Dashboard

This project uses:

- [ReactJS](https://reactjs.org)
- [Vite](https://vitejs.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwindcss](https://tailwindcss.com)
- [Eslint](https://eslint.org)
- [Prettier](https://prettier.io)
- [ExpressJS]

## Getting Started

### Install & setup

Clone the project.
```bash
1. Install docker-compose[https://docs.docker.com/compose/install/]
2. Download docker-compose.yaml[https://gist.githubusercontent.com/j-tim/6063f27251419017129cb6ec4ffe22a2/raw/bb94f2828cf0e6662a788bee2bbc2657f71add74/docker-compose.yml]
3. Run “docker-compose up -d” to install ElasticSearch and Kibana 
4. Install sample data. We recommend installing “Sample web logs” 
5. Make sure the data is populated: curl "http://localhost:9200/kibana_sample_data_logs/_search"
```

Start the backend proxy 

```bash
cd dashboard/api
npm install && npm run start
```


Start the front-end

```bash
cd dashboard 
npm install && npm run dev
```