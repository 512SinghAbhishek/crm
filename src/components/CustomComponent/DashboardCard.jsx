import React from 'react';
import { Card, CardContent, Typography, Box, Grid2 as Grid, Container } from '@mui/material';
import CountUp from 'react-countup';

const parseAmount = (amount) => {
  if (typeof amount === 'string') {
    const isMillion = amount.includes('M');
    const isThousand = amount.includes('K');
    const numericValue = parseFloat(amount.replace(/[^0-9.]/g, ''));
    const suffix = isMillion ? 'M' : isThousand ? 'K' : '';
    return { numericValue, suffix };
  }
  return { numericValue: amount, suffix: '' };
};

const DashboardCard = ({ title, amount, percentageChange, linkText, boxColor = '#d1c8c8' }) => {
  const percentageColor = percentageChange > 0 ? 'success.main' : 'error.main';
  const { numericValue, suffix } = parseAmount(amount);

  return (
    <Card sx={{ maxWidth: 345, borderRadius: 2, boxShadow: 2 }}>
      <CardContent>
        <Grid container flexDirection="row" justifyContent="space-between">
          {/* Amount and Percentage Change */}
          <Grid container justifyContent="space-between" alignItems="flex-start" flexDirection="column" spacing={1}>
            {/* Title */}
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {title}
            </Typography>

            {/* Animated Amount */}
            <Typography variant="h4" fontWeight="bold" fontSize="1.3rem">
              <CountUp start={0} end={numericValue} duration={2} separator="," />{suffix}
            </Typography>

            <Box mt={2}>
              <Typography variant="body2" color="primary" sx={{ textDecoration: 'underline', cursor: 'pointer' }}>
                {linkText}
              </Typography>
            </Box>
          </Grid>

          <Grid container justifyContent="space-between" alignItems="center" flexDirection="column" spacing={1}>
            <Typography variant="body2" sx={{ fontWeight: 'bold', color: percentageColor }}>
              {percentageChange > 0 ? `+${percentageChange}%` : `${percentageChange}%`}
            </Typography>

            <Box sx={{ width: 50, height: 50, backgroundColor: boxColor, borderRadius: 1 }} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;

