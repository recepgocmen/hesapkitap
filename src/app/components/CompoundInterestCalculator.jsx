"use client";

import React, { useState, useEffect } from "react";

const CompoundInterestCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState("");
  const [annualReturn, setAnnualReturn] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (monthlyInvestment && annualReturn) {
      calculateCompoundInterest();
    } else {
      setResults([]);
    }
  }, [monthlyInvestment, annualReturn]);

  const calculateCompoundInterest = () => {
    let totalPortfolio = 0;
    const newResults = [];

    for (let year = 1; year <= 15; year++) {
      totalPortfolio += Number(monthlyInvestment) * 12;
      const annualGain = totalPortfolio * (Number(annualReturn) / 100);
      totalPortfolio += annualGain;

      newResults.push({
        year,
        totalPortfolio: totalPortfolio.toFixed(2),
        annualGain: annualGain.toFixed(2),
      });
    }

    setResults(newResults);
  };

  return (
    <div className="md:p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Yatırımım Ne Kadar?
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Aylık Yatırım ($)
          </label>
          <input
            type="number"
            value={monthlyInvestment}
            onChange={(e) => setMonthlyInvestment(e.target.value)}
            placeholder="Aylık yatırım miktarını girin"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-blue-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Yıllık Kazanç Oranı (%)
          </label>
          <input
            type="number"
            value={annualReturn}
            onChange={(e) => setAnnualReturn(e.target.value)}
            placeholder="Yıllık kazanç oranını girin"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-900 transition"
          />
        </div>
      </div>

      <div className="mb-8">
        <p className="text-sm italic text-gray-600">
          Not: Hesaplamada, tüm kazançlar yeniden yatırılmakta, hiçbir para
          çıkışı olmamaktadır.
        </p>
      </div>

      {results.length > 0 ? (
        <>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Yıllık Kazanç Miktarı (Yıllık {annualReturn}% Kazanç)
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Yıl
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Toplam Portföy ($)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    1 Yıllık Kazanç ($)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {results.map((row) => (
                  <tr
                    key={row.year}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {row.year}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {parseFloat(row.totalPortfolio).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {parseFloat(row.annualGain).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-600 mt-8">
          Lütfen aylık yatırım miktarı ve yıllık kazanç oranını girin.
        </p>
      )}
    </div>
  );
};

export default CompoundInterestCalculator;
