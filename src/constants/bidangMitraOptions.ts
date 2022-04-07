type Option = {
  label: string
  value?: string
}

const greenEnergySystemsOptions: Option[] = [
  {
    label: "Geothermal"
  },
  {
    label: "Enhanced oil recovery"
  },
  {
    label: "Conventional oil & gas optimation"
  },
  {
    label: "Unconventional oil & gas"
  },
  {
    label: "Energy storage"
  },
  {
    label: "Renewable energy"
  },
  {
    label: "Bioenergy"
  },
  {
    label: "Smart grid"
  }
]

const sustainableBuildingAndInfrastructureOptions: Option[] = [
  {
    label: "Smart & green building"
  },
  {
    label: "Building waste management"
  },
  {
    label: "Precast concrete for green building and infrastructure"
  },
  {
    label: "Adaptive building elements"
  },
  {
    label: "Futuristic responsive sustainable architecture"
  }
]

const smartSystemsAndAutomationOptions: Option[] = [
  {
    label: "Smart transportation technology"
  },
  {
    label: "Biometrics"
  },
  {
    label: "Wireless Sensor Network applications"
  },
  {
    label: "Flight control systems & navigation"
  },
  {
    label: "Building automation systems"
  },
  {
    label: "Robotics for medical applications"
  },
  {
    label: "Sensors and automation"
  },
  {
    label: "Biomedical systems"
  },
  {
    label: "Unmanned systems"
  },
  {
    label: "Communication"
  }
]

const hazardAndRiskManagementOptions: Option[] = [
  {
    label: "Hazard potential monitoring systems"
  },
  {
    label: "Advanced early warning systems"
  },
  {
    label: "Disaster management systems"
  },
  {
    label: "Industrial hazard and risk management"
  },
  {
    label: "Nuclear waste management"
  }
]

const greenAdvancedMaterialsOptions: Option[] = [
  {
    label: "Earth"
  },
  {
    label: "Bio"
  },
  {
    label: "High temperature"
  },
  {
    label: "Composite"
  },
  {
    label: "Ceramics"
  },
  {
    label: "Nano"
  },
  {
    label: "Bamboo & woods"
  },
  {
    label: "Concrete"
  }
]

const sustainableEnvironmentOptions: Option[] = [
  {
    label: "Sustainable urban environment"
  },
  {
    label: "Sustainable rural environment"
  },
  {
    label: "Clean production"
  }
]

const greenAndSmartTransportationSystemsOptions: Option[] = [
  {
    label: "Public transportation & tourism"
  },
  {
    label: "Tunneling systems"
  },
  {
    label: "Autonomous vehicles"
  },
  {
    label: "Underwater vehicles"
  },
  {
    label: "Electric cars"
  }
]

const sustainableManufacturingSystemsOptions: Option[] = [
  {
    label: "Process"
  },
  {
    label: "Metrology"
  },
  {
    label: "Management"
  },
  {
    label: "Automation"
  },
  {
    label: "Systems"
  },
  {
    label: "Computer integrated manufacturing"
  }
]

const getValue = (options: Option[]) => {
  return options.map((option) => {
    return {
      ...option,
      value: option.label
    }
  })
}

export const groupedOptions = [
  {
    label: "Green Energy Systems",
    options: getValue(greenEnergySystemsOptions)
  },
  {
    label: "Sustainable Building & Infrastructure",
    options: getValue(sustainableBuildingAndInfrastructureOptions)
  },
  {
    label: "Smart Systems & Automation",
    options: getValue(smartSystemsAndAutomationOptions)
  },
  {
    label: "Hazard & Risk Management",
    options: getValue(hazardAndRiskManagementOptions)
  },
  {
    label: "Green Advanced Materials",
    options: getValue(greenAdvancedMaterialsOptions)
  },
  {
    label: "Sustainable Environment",
    options: getValue(sustainableEnvironmentOptions)
  },
  {
    label: "Green & Smart Transportation Systems",
    options: getValue(greenAndSmartTransportationSystemsOptions)
  },
  {
    label: "Sustainable Manufacturing Systems",
    options: getValue(sustainableManufacturingSystemsOptions)
  }
]
