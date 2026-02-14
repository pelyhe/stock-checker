-- CreateTable
CREATE TABLE "Stock" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "symbol" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "change" REAL NOT NULL,
    "percentChange" REAL NOT NULL,
    "highPrice" REAL NOT NULL,
    "lowPrice" REAL NOT NULL,
    "openPrice" REAL NOT NULL,
    "previousClosePrice" REAL NOT NULL,
    "fetchedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Stock_symbol_key" ON "Stock"("symbol");

-- CreateIndex
CREATE INDEX "Stock_symbol_fetchedAt_idx" ON "Stock"("symbol", "fetchedAt" DESC);
