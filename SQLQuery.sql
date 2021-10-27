SELECT EmployeeId, SUM(Total) as Total
FROM employees
INNER JOIN customers
ON employees.EmployeeId = customers.SupportRepId
INNER JOIN invoices
ON customers.CustomerId =  invoices.CustomerId
GROUP BY EmployeeId
ORDER BY Total DESC

-- partial solution, not returning null when no value found.