if (!globalThis.fetch) {
    globalThis.fetch = require('node-fetch');
}

exports.getDepartament = async (req, res) => {
    try {
        const response = await fetch('https://api-colombia.com/api/v1/Department');
        const data = await response.json();
        const departments = data.map(department => ({
            id: department.id,
            name: department.name
        }));
        res.json(departments);
    } catch (error) {
        console.error('Error fetching departments:', error);
        res.status(500).send('Error fetching departments');
    }
};

exports.getCitiesByDepartment = async (req, res) => {
    const { name } = req.query;
    
    try {
        const deptResponse = await fetch('https://api-colombia.com/api/v1/Department');
        const deptData = await deptResponse.json();

        const department = deptData.find(dept => dept.name.toLowerCase() === name.toLowerCase());

        if (!department) {
            return res.status(404).send('Department not found');
        }

        const cityResponse = await fetch(`https://api-colombia.com/api/v1/Department/${department.id}/cities`);
        const cityData = await cityResponse.json();
        const cities = cityData.map(city => ({
            id: city.id,
            name: city.name
        }));

        res.json(cities);
    } catch (error) {
        console.error('Error fetching cities:', error);
        res.status(500).send('Error fetching cities');
    }
};
