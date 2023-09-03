-- CreateTable
CREATE TABLE "City" (
    "city_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "city_name" TEXT NOT NULL,
    "city_timeZone" TEXT NOT NULL,
    "city_lat" REAL NOT NULL,
    "city_lag" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Forecast" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dt" DATETIME NOT NULL,
    "temp" REAL NOT NULL,
    "temp_min" REAL NOT NULL,
    "temp_max" REAL NOT NULL,
    "humidity" INTEGER NOT NULL,
    "city_id" INTEGER NOT NULL,
    CONSTRAINT "Forecast_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "City" ("city_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
