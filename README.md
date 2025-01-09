
### Step 1: Clone the Repository

```bash
git clone https://github.com/lakshayyy10/levo.git
cd levo
```

### Step 2: Set Up Python Environment (LattePanda/pc)

Create and activate a Python virtual environment:

```bash
python -m venv env

# On Windows
.\env\Scripts\activate

# On Linux/Mac
source env/bin/activate
```

### Step 3: Install Python Dependencies (LattePanda)

```bash
pip install -r requirements.txt
```

### Step 4: Install Node.js Dependencies (PC)

```bash
npm install
```

## Running the System

### Step 5: Start the Applications

On LattePanda:
```bash
python latte.py
```

On PC:
```bash
npm run start:all
```

The system generates a CSV file with sensor data in the following format:
```
Timestamp,Sensor1,Sensor2,Sensor3,Sensor4,Sensor5
2025-01-09 12:34:56.789012,23.5,45.2,67.8,12.3,34.5
```

