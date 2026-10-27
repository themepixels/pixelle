'use strict';

///// Total Conversions /////
var optionTotalConversions = {
  series: [{
    name: 'Conversions',
    data: [5, 15, 10, 12, 8, 10, 6]
  }],
  chart: {
    type: 'bar',
    height: 100,
    parentHeightOffset: 0,
    toolbar: { show: false },
    sparkline: { enabled: true },
    animations: { enabled: false }
  },
  colors: ['#7c86ff'],
  plotOptions: {
    bar: {
      borderRadius: 3,
      columnWidth: '40%'
    },
  },
  yaxis: {
    show: false,
    max: 20,
    tickAmount: 3
  },
  fill: { opacity: 1 },
  tooltip: { enabled: false }
};

var chartTotalConversions = new ApexCharts(document.querySelector('#chartTotalConversions'), optionTotalConversions);
chartTotalConversions.render();

///// Click Through /////
var optionClickThrough = {
  series: [{
    name: 'Clicks',
    data: [10, 12, 8, 5, 15, 10, 6]
  }],
  chart: {
    type: 'bar',
    height: 100,
    parentHeightOffset: 0,
    toolbar: { show: false },
    sparkline: { enabled: true },
    animations: { enabled: false }
  },
  colors: ['#51a2ff'],
  plotOptions: {
    bar: {
      borderRadius: 3,
      columnWidth: '40%'
    },
  },
  yaxis: {
    show: false,
    max: 20,
    tickAmount: 3
  },
  tooltip: { enabled: false }
};

var chartClickThrough = new ApexCharts(document.querySelector('#chartClickThrough'), optionClickThrough);
chartClickThrough.render();

///// Click Through /////
var optionViewThrough = {
  series: [{
    name: 'Clicks',
    data: [12, 8, 10, 6, 5, 15, 10]
  }],
  chart: {
    type: 'bar',
    height: 100,
    parentHeightOffset: 0,
    toolbar: { show: false },
    sparkline: { enabled: true },
    animations: { enabled: false }
  },
  colors: ['#00d5be'],
  plotOptions: {
    bar: {
      borderRadius: 3,
      columnWidth: '40%'
    },
  },
  yaxis: {
    show: false,
    max: 20,
    tickAmount: 3
  },
  tooltip: { enabled: false }
};

var chartViewThrough = new ApexCharts(document.querySelector('#chartViewThrough'), optionViewThrough);
chartViewThrough.render();


// Organic Visits & Conversions
var optionChart1 = {
  series: [{
    data: [[0,1000],[1,600],[2,500],[3,400],[4,600],[5,500],[6,800],[7,1000],[8,900],[9,1100],[10,1500],[11,1700],[12,1400],[13,1300],[14,1500],[15,1300],[16,1200],[17,1000],[18,1100],[19,800],[20,500],[21,300],[22,500],[23,600],[24,500],[25,600],[26,800],[27,1000],[28,900],[29,800],[30,500]]
  }, {
    data: [[0,30],[1,30],[2,30],[3,30],[4,30],[5,30],[6,30],[7,30],[8,30],[9,30],[10,30],[11,30],[12,30],[13,30],[14,30],[15,30],[16,30],[17,30],[18,30],[19,30],[20,30],[21,30],[22,30],[23,30],[24,30],[25,30],[26,30],[27,30],[28,30],[29,30],[30,30]]
  }, {
    data: [[0,800],[1,600],[2,500],[3,400],[4,600],[5,500],[6,800],[7,1000],[8,900],[9,1100],[10,1500],[11,1700],[12,1400],[13,1300],[14,1500],[15,1300],[16,1200],[17,1000],[18,1100],[19,800],[20,500],[21,300],[22,500],[23,600],[24,500],[25,600],[26,800],[27,1000],[28,900],[29,800],[30,500]]
  }],
  chart: {
    type: 'bar',
    height: 187,
    parentHeightOffset: 0,
    stacked: true,
    toolbar: { show: false },
    zoom: { enabled: false, }
  },
  grid: {
    borderColor: 'rgba(72,94,144, 0.07)',
    padding: {
      top: -20,
      left: 5
    }
  },
  states: {
    hover: {
      filter: {
        type: 'none'
      }
    },
    active: {
      filter: {
        type: 'none'
      }
    }
  },
  colors: ['#1447e6','#fff', '#8ec5ff'],
  plotOptions: {
    bar: {
      borderRadius: 4,
      columnWidth: '40%'
    },
  },
  dataLabels: { enabled: false },
  tooltip: { enabled: false },
  fill: { opacity: 1 },
  legend: { show: false },
  xaxis: {
    type: 'categories',
    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yaxis: {
    min: 0,
    max: 3500,
    tickAmount: 5,
    labels: {
      style: {
        colors: ['#a2abb5'],
        fontSize: '11px'
      }
    }
  }
};

var apexChart1 = new ApexCharts(document.querySelector('#apexChart1'), optionChart1);
apexChart1.render();


// Acquisition
var optionChart2 = {
  series: [{
    name: 'Growth',
    data: [
      [0,20],[1,25],[2,20],[3,24],[4,15],[5,16],[6,20],[7,30],[8,40],[9,40],
      [10,40],[11,50],[12,45],[13,35],[14,45],[15,45],[16,50],[17,55],[18,65],[19,45],
      [20,50],[21,65],[22,65],[23,60],[24,70],[25,85],[26,90],[27,100],[28,60],[29,45],
      [30,20],[31,25],[32,45],[33,25],[34,30],[35,45],[36,55],[37,50],[38,60],[39,65],
      [40,80],[41,85],[42,80],[43,90],[44,85],[45,80],[46,100]
    ]
  },{
    name: 'Actual',
    data: [
      [0,60],[1,55],[2,62],[3,54],[4,65],[5,66],[6,60],[7,70],[8,60],[9,70],
      [10,65],[11,75],[12,70],[13,65],[14,85],[15,95],[16,95],[17,105],[18,115],[19,110],
      [20,130],[21,140],[22,165],[23,155],[24,120],[25,110],[26,140],[27,150],[28,170],[29,155],
      [30,165],[31,160],[32,110],[33,140],[34,140],[35,115],[36,105],[37,110],[38,100],[39,110],
      [40,140],[41,130],[42,140],[43,150],[44,180],[45,190],[46,220]
    ]
  }],
  chart: {
    type: 'area',
    height: 200,
    parentHeightOffset: 0,
    stacked: true,
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false,
    }
  },
  colors: ['#1447e6', '#00bcff'],
  dataLabels: {
    enabled: false
  },
  grid: {
    borderColor: 'rgba(72,94,144, 0.07)',
    padding: {
      top: -20,
      bottom: 0,
      left: 20
    },
    yaxis: {
      lines: {
        show: true
      }
    }
  },
  stroke: {
    curve: 'smooth',
    width: 2
  },
  fill: {
    colors: ['#1447e6', '#00bcff'],
    type: ['gradient', 'gradient'],
    opacity: 1,
    gradient: {
      opacityFrom: 0.1,
      opacityTo: 0.5,
    }
  },
  legend: {
    show: false
  },
  tooltip: {
    enabled: false
  },
  yaxis: {
    min: 0,
    max: 300,
    tickAmount: 5,
    show: false
  },
  xaxis: {
    type: 'numeric',
    tickAmount: 7,
    labels: {
      style: {
        colors: '#6e7985',
        fontSize: '11px'
      }
    },
    axisBorder: {
      show: false
    }
  }
};

var apexChart2 = new ApexCharts(document.querySelector('#apexChart2'), optionChart2);
apexChart2.render();


///// Traffic Sources /////
var optionDonut = {
  series: [34.8, 27.1, 15.6, 12.2, 8.3],
  labels: ['Direct', 'Organic Search', 'Referrals', 'Social Media', 'Other'],
  chart: {
    type: 'donut',
    height: 220,
  },
  plotOptions: {
    pie: {
      donut: {
        size: '60%',
      },
    },
  },
  grid: {
    padding: {
      top: 0,
      bottom: 0
    }
  },
  colors: ['#615fff', '#00a6f4', '#f6339a', '#00d492', '#fe9a00'],
  legend: {
    show: false,
  },
  tooltip: {
    enabled: false
  },
  dataLabels: {
    enabled: false,
    style: {
      fontFamily: 'inherit',
      fontSize: '8px',
      fontWeight: '500'
    },
    dropShadow: {
      enabled: false
    }
  }
}

var chartDonut = new ApexCharts(document.querySelector('#chartDonut'), optionDonut)
chartDonut.render()



/////////////////////////////


const map = new jsVectorMap({
  selector: '#map',
  map: 'world',
  zoomButtons: false,
  zoomOnScroll: false,
  regionStyle: {
    initial: {
      fill: '#cad5e2',
      fillOpacity: 1,
      stroke: '#FFFFFF',
      strokeWidth: 1.5
    }
  },
  series: {
    regions: [{
      attributes: {
        US: '#155dfc',
        IN: '#ad46ff',
        AU: '#ff8904',
        CN: '#00d5be',
        BR: '#9ae600',
        JP: '#f6339a',
        SA: '#00bcff'
      }
    }]
  }
});
