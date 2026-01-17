// Subcategories mapping based on motrparts.com structure
const subcategories = {
    'suspension-steering': [
        'Struts and Shock absorbers',
        'Bushes, Strut mount & Kits',
        'Coil Springs',
        'Tie Rod End / Outer Ball Joint',
        'Rack End / Steering Ball Joint', 
        'Stabilizer Link',
        'Control Arm',
        'Suspension Ball Joint',
        'Steering Box Assembly / Rack assembly',
        'Power Steering Pump',
        'Gas Spring / Dicky Shocks',
        'Power Steering Oil',
        'Other suspension & Steering parts'
    ],
    'body-parts': [
        'Rear View Mirrors',
        'Headlights',
        'Tail Lights',
        'Fog Lights & Indicator Lights',
        'Bumpers',
        'Fender & Fender Liner',
        'Bonnet',
        'Doors, Locks & Handles',
        'Grills',
        'Other Body Parts'
    ],
    'air-conditioning': [
        'Radiator',
        'Intercooler',
        'AC compressor',
        'Condensor',
        'Evaporator / Cooling Coil',
        'Fans',
        'Cabin Filter',
        'Coolant Oil',
        'Radiator Hose',
        'Heater Hose',
        'AC Gas'
    ],
    'engine': [
        'Filters – Air, Oil, Fuel',
        'Piston, Rings, Liners',
        'Main & Connect Bearing',
        'Oil Cooler & Assembly',
        'Fuel Pump Motor / Assy',
        'Thermostat & Parts',
        'Gasket & Seals',
        'Engine Belts',
        'Timing Tensioners & Idler Pulley',
        'Timing Kit',
        'Water Pump',
        'Turbo chargers',
        'Mountings',
        'Valves',
        'Fuel Injectors',
        'Cylinder Head Parts',
        'Other Engine Parts'
    ],
    'transmission': [
        'Clutch Set',
        'Drive Shafts / Propeller Shafts & Parts',
        'Flywheel',
        'Clutch Bearing / Clutch Slave Cylinder (CSC)',
        'Clutch Master Cylinder/CMC',
        'Clutch Cables',
        'Wheel Bearings',
        'Gear & Transmission Oil'
    ],
    'brake': [
        'Brake Pads',
        'Disc Rotors',
        'Brake Shoes',
        'Brake Drums',
        'Brake Master Cylinder',
        'Wheel Cylinder',
        'Brake Booster',
        'Brake Oil',
        'Other brake parts'
    ],
    'electrical': [
        'Alternator & Parts',
        'Starter Motor & Parts',
        'Horns',
        'Clock Springs',
        'Bulbs',
        'Spark Plugs',
        'Ignition Coil & Plug Wires',
        'Sensors',
        'Power Window Switches',
        'Switches',
        'Meters & Gauges',
        'Control Cables',
        'Glow plugs'
    ],
    'accessories': [
        'Wiper Blade',
        'Wiper Arm & Link',
        'Perfumes',
        'Mobile Holder',
        'Car Infotainment',
        'Car Care',
        'Others'
    ]
};

// Parts Brands (from motrparts.com)
const partsBrands = [
    'Banco',
    'Behr',
    'Bosch',
    'Brembo',
    'Delphi',
    'Denso',
    'Elofic',
    'Gabriel',
    'Gates',
    'Hella',
    'KBX',
    'KYB',
    'LUK',
    'Monroe',
    'MSL',
    'NGK',
    'Purolator',
    'QH Talbros',
    'Rane',
    'Roots',
    'Sachs',
    'Subros',
    'Super Circle',
    'TRW',
    'TVS Girling',
    'Uno Minda',
    'Valeo'
];

// Make subcategories globally accessible
window.subcategories = subcategories;
window.partsBrands = partsBrands;

