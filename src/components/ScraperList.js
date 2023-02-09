import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';


const ScraperList = () => {
    const [scrapers, setScrapers] = useState([]);
    useEffect(() => {
        axios
            .get('https://api.github.com/repos/Equator-Studios/scrapers/contents/scrapers')
            .then(res => {
                const scrapers = res.data.map(item => ({
                    name: item.name,
                    gitHubUrl: item.html_url,
                    downloadUrl: item.download_url
                }));
                setScrapers(scrapers);
            })
            .catch(err => {
                console.error(err);
            });
    });
    console.log(scrapers)
    return (
        <div style={{ display: 'flex', width: '100%' }}>
            <DataGrid
                autoHeight
                getRowId={row => row.name}
                columns={[
                    { field: 'name', headerName: 'Name', width: 300 },
                    { field: 'gitHubUrl', headerName: 'GitHub URL', width: 600, renderCell:(row)=><a href={row.value} target="_blank" rel="noreferrer">{row.value}</a> },
                    { field: 'downloadUrl', headerName: 'Download URL', width: 600, renderCell:(row)=><a href={row.value} target="_blank" rel="noreferrer">{row.value}</a> },
                ]}
                rows={scrapers}
            />
        </div>
    );
};

export default ScraperList;
