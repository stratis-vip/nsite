<?php


function findSumOfThreeAndFive($Range)
{
	$sum=0;
	for ($i=1;$i<$Range;$i++)
	{
		if (($i % 3==0 ) || ($i % 5==0))
		{
			$sum+=$i;
		}
	}

	return $sum;
}

echo findSumOfThreeAndFive(1000);
echo "";
