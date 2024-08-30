"use client";

import React, { useState, useEffect } from "react";

const CompoundInterestCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(100);
  const [annualReturn, setAnnualReturn] = useState(10);
  const [results, setResults] = useState([]);

  useEffect(() => {
    calculateCompoundInterest();
  }, [monthlyInvestment, annualReturn]);

  const calculateCompoundInterest = () => {
    let totalPortfolio = 0;
    const newResults = [];

    for (let year = 1; year <= 15; year++) {
      const monthlyReturn = annualReturn / 12 / 100;
      totalPortfolio =
        (totalPortfolio + monthlyInvestment * 12) * (1 + annualReturn / 100);

      newResults.push({
        year,
        monthlyInvestment,
        totalPortfolio: totalPortfolio.toFixed(2),
      });
    }

    setResults(newResults);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Birleşik Faiz Hesaplama</h1>

      <div className="mb-4">
        <label className="block mb-2">
          Aylık Yatırım ($):
          <input
            type="number"
            value={monthlyInvestment}
            onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
            className="border rounded px-2 py-1 ml-2"
          />
        </label>
      </div>

      <div className="mb-4">
        <label className="block mb-2">
          Yıllık Kazanç Oranı (%):
          <input
            type="number"
            value={annualReturn}
            onChange={(e) => setAnnualReturn(Number(e.target.value))}
            className="border rounded px-2 py-1 ml-2"
          />
        </label>
      </div>

      <div className="mb-4">
        <p className="text-sm italic">
          Not: Hesaplamada, tüm temettüler ve kazançlar yeniden yatırılmakta,
          hiçbir para çıkışı olmamaktadır.
        </p>
      </div>

      <h2 className="text-xl font-semibold mb-2">
        Yıllık Kazanç Miktarı (Yıllık {annualReturn}% Kazanç)
      </h2>

      <thead>
        <tr>
          <th>Yıl</th>
          <th>Aylık Yatırım ($)</th>
          <th>Toplam Portföy ($)</th>
        </tr>
      </thead>
      <tbody>
        {results.map((row) => (
          <tr key={row.year}>
            <td>{row.year}</td>
            <td>{row.monthlyInvestment}</td>
            <td>{row.totalPortfolio}</td>
          </tr>
        ))}
      </tbody>
    </div>
  );
};

export default CompoundInterestCalculator;
