import React, { useState } from 'react'
import './style.scss'

const FilterAdmin = ({
    filterableFields = [],
    onLevelChange
}) => {

    const [params, setParams] = useState({
        keyword: "",
        filter: { field: "", value: "" },
    });

    const [selectedLevel, setSelectedLevel] = useState("All");

    const handleSearch = () => {
        const criteria = {...params};
        console.log(criteria)
    };

    const clearCriteria = () => {
        setParams({
            keyword: "",
            filter: { field: "", value: "" },
        });
    };

    return (
        <div className="search-sort">         
            {filterableFields?.length > 0 && <>
                <div className="p-2 px-4 pt-1">
                    <select
                        id="field"
                        className="outline-none p-2 search-input"
                        onChange={(e) => {
                            setSelectedLevel(e.target.value);
                            onLevelChange(e.target.value);
                          }}
                          value={selectedLevel}
                    >
                        <option value="" key="NO_FIELD" disabled>
                            Filter by field
                        </option>
                        {filterableFields.map((field) => (
                            <option value={field.field} key={field.field}>
                                {field.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="p-2 px-4 pt-1">
                    <select
                        id="field"
                        className="outline-none p-2 search-input"
                        style={{ backgroundColor: "white" }}
                        disabled={!params.filter.field}
                        onChange={(e) =>
                            setParams({
                                ...params,
                                filter: { ...params.filter, value: e.target.value },
                            })
                        }
                        value={params.filter.value}
                    >
                        <option value="" key="NO_VALUE" disabled>
                            Select value
                        </option>
                        {filterableFields
                            .find((field) => field.field === params.filter.field)
                            ?.options.map((option) => (
                                <option value={option.value} key={option.value}>
                                    {option.label}
                                </option>
                            ))}
                    </select>
                </div>
            </>}
            <div className="p-2 px-4 pe-2 pt-1">
                <button className="btn btn-primary p-2" style={{width: '100px'}} onClick={() => handleSearch()}>
                    Apply
                </button>
            </div>
            <div className="p-2 px-4 pe-2 pt-1">
                <button className="btn btn-danger p-2" style={{width: '100px'}} onClick={() => clearCriteria()}>
                    Clear
                </button>
            </div>
        </div>
    )
}

export default FilterAdmin