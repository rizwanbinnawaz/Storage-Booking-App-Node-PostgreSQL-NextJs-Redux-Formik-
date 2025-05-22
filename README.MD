
---

```markdown
# 📦 Storage Booking App

A full-stack web application for managing and booking storage units. Users can browse available units, make bookings, and view their booking history.

---

## 🚀 Features

### 🖥️ Frontend (Next.js + Redux + Formik + Yup)
- Built with **Next.js App Router**
- **Redux Toolkit** for robust global state management
- **Formik + Yup** for form handling & validation
- Client-side booking form with date range
- Displays active & expired bookings with status
- Responsive UI with Tailwind CSS

### 🔙 Backend (Node.js + Express + PostgreSQL)
- REST API for storage units and bookings
- Filters units by location & size
- Booking with availability checks
- PostgreSQL database connection via `pg`

---

## 📁 Project Structure

<pre> ```
storage-booking-app/
├── backend/
│   ├── models/
│   ├── routes/
│   │   ├── bookings.js
│   │   └── units.js
│   ├── db.js
│   ├── server.js
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.js
│   │   │   └── units/page.js
│   │   ├── components/
│   │   ├── store/
│   │   ├── styles/
│   │   └── validations/
│   ├── public/
│   ├── next.config.js
├── README.md

``` </pre>
---

## DEMO VIDEO https://github.com/your-username/storage-booking-app.git

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/storage-booking-app.git
cd storage-booking-app
```

### 2. Setup PostgreSQL Database
Make sure PostgreSQL is installed and running.

#### Create database and tables:
```sql
CREATE DATABASE storage_booking;
\c storage_booking;

CREATE TABLE storage_units (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  size VARCHAR(50),
  location VARCHAR(100),
  pricePerDay NUMERIC,
  isAvailable BOOLEAN DEFAULT TRUE
);

CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  userName VARCHAR(100),
  unitId INTEGER REFERENCES storage_units(id),
  startDate DATE,
  endDate DATE
);
```

#### Insert mock data:
```sql
INSERT INTO storage_units (name, size, location, pricePerDay) VALUES
('Unit A', 'Small', 'Dubai', 10),
('Unit B', 'Medium', 'Dubai', 20),
('Unit C', 'Large', 'Sharjah', 30);
```

### 3. Configure Environment Variables
Create a `.env` file in the `backend/` folder:
```env
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=storage_booking
DB_HOST=localhost
DB_PORT=5432
```

### 4. Run Backend Server
```bash
cd backend
npm install
node server.js
```

> Use `nodemon` if you want hot-reload during development:
```bash
npm install -g nodemon
nodemon server.js
```

### 5. Run Frontend App
```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 API Endpoints

### GET `/units`

* Query params: `location`, `size`
* Returns available units

### POST `/book`

* Body: `{ userName, unitId, startDate, endDate }`
* Returns booking confirmation or error

### GET `/bookings?userName=John`

* Returns all bookings by a specific user

---

## 🛠️ Tech Stack

### Frontend

* **Next.js 15** (App Router)
* **Redux Toolkit**
* **Formik + Yup** (form validation)
* **Tailwind CSS**
* **Axios**, **date-fns**

### Backend

* **Node.js**, **Express.js**
* **PostgreSQL**, **pg**

---

## 📌 Validations

* Form validations are handled using **Formik** and **Yup**
* User input is checked for required fields, date range, etc.
* Errors are displayed inline with form fields

---

## 👨‍💻 Developer

Built by [Rizwan](https://github.com/rizwanbinnawz)
Phone +971525571270

