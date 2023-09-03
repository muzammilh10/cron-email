/*
  Warnings:

  - A unique constraint covering the columns `[city_id,dt]` on the table `Forecast` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Forecast_city_id_dt_key" ON "Forecast"("city_id", "dt");
