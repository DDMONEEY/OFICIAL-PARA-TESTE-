
import React, { useState, useRef } from 'react';
import { Header } from './components/Header';
import { Section } from './components/Section';
import { Field } from './components/Field';
import { InputField } from './components/InputField';
import { Footer } from './components/Footer';

// Declare libraries loaded via CDN
declare var html2canvas: any;
declare var jspdf: any;

const naturezaOptions = [
  'Roubo à mão armada',
  'Roubo com restrição de liberdade do motorista',
  'Roubo com refém / sequestro relâmpago',
  'Roubo em estacionamento / pátio',
  'Roubo em armazém ou filial',
  'Roubo de carga parcial',
  'Roubo de carga total',
  'Roubo de carga com adulteração de nota fiscal',
  'Furto simples (sem rompimento de lacre)',
  'Furto qualificado (com rompimento de lacre ou arrombamento)',
  'Furto de carga em descanso noturno',
  'Furto de combustível',
  'Furto de equipamento do veículo (bateria, pneu, módulo etc.)',
  'Furto de parte da carga (subtração parcial)',
  'Desvio de rota com dolo (motorista)',
  'Desvio de carga com conluio de terceiros',
  'Apropriação indébita (condutor ou terceiro)',
  'Estelionato (entrega fraudulenta / notas falsas)',
  'Carga desviada para endereço falso',
  'Saque popular após acidente',
  'Tentativa de roubo frustrada',
  'Invasão de veículo parado com subtração parcial',
  'Pirataria de estrada',
  'Carga violada em pátio ou posto',
  'Roubo com troca de cavalo / carreta',
  'Tombamento total do conjunto',
  'Saída de pista seguida de colisão',
  'Saída de pista seguida de tombamento',
  'Tombamento da segunda composição',
  'Tombamento da primeira composição',
  'Tombamento parcial (carreta ou cavalo)',
  'Capotamento',
  'Colisão frontal',
  'Colisão lateral',
  'Colisão traseira',
  'Engavetamento múltiplo',
  'Choque com objeto fixo (poste, mureta, árvore, defensa)',
  'Deslizamento / derrapagem',
  'Queda em ribanceira',
  'Afundamento de pista ou ponte',
  'Afundamento em balsa / transporte fluvial',
  'Colisão com animal',
  'Quebra de eixo / cavalo / engate com tombamento',
  'Desacoplamento do reboque / semi-reboque',
  'Ruptura do pino-rei',
  'Saída de pista simples',
  'Colisão com outro veículo de carga',
  'Capotamento durante manobra',
  'Incêndio pós-colisão',
  'Deslizamento de encosta sobre o veículo',
  'Queda de carga em movimento',
  'Avaria durante o transporte',
  'Avaria por impacto',
  'Avaria por tombamento / colisão',
  'Avaria por queda de carga',
  'Avaria por empilhamento incorreto',
  'Avaria por movimentação inadequada',
  'Avaria por compressão / amassamento',
  'Molhadura (chuva, infiltração, lavagem)',
  'Derramamento de líquido / vazamento',
  'Contaminação de produto (química / biológica)',
  'Oxidação / corrosão',
  'Mistura de produtos diferentes',
  'Avaria em embalagens',
  'Deformação térmica (calor / frio)',
  'Vibração / trepidação',
  'Falha na amarração',
  'Embalagem rasgada / violada',
  'Produto avariado em transbordo',
  'Avaria por sobrepeso ou empilhamento indevido',
  'Incêndio no veículo',
  'Incêndio na carreta / baú',
  'Incêndio em pátio / terminal',
  'Incêndio em carga inflamável',
  'Incêndio por pane elétrica',
  'Curto-circuito no equipamento transportado',
  'Incêndio por atrito de freios',
  'Explosão de carga perigosa',
  'Autoignição de produto químico',
  'Queima de cabos / módulos elétricos',
  'Queima por superaquecimento solar',
  'Incêndio por fagulha mecânica',
  'Incêndio por acidente com combustível derramado',
  'Enchente / inundação',
  'Alagamento em via pública',
  'Deslizamento de terra',
  'Queda de barreira',
  'Vendaval',
  'Tempestade elétrica',
  'Granizo',
  'Raios (descarga elétrica direta)',
  'Calor extremo / insolação da carga',
  'Geada / frio intenso',
  'Neblina densa com acidente',
  'Formação de gelo na via',
  'Queda de árvore / galho',
  'Areia / poeira contaminando produto',
  'Enxurrada',
  'Nevasca (regiões sulinas / internacionais)',
  'Erro de carregamento (produto trocado / faltante)',
  'Erro de endereçamento',
  'Entrega em local incorreto',
  'Entrega parcial',
  'Falta de documentação',
  'Documento adulterado',
  'Lacre trocado / violado',
  'Lacre rompido por fiscalização',
  'Carga não conferida no embarque',
  'Falha na amarração',
  'Falha no travamento de baú',
  'Falha de manobra',
  'Desbalanceamento do veículo',
  'Queda de carga durante descarga',
  'Avaria em transbordo',
  'Extravio parcial',
  'Extravio total',
  'Carga abandonada',
  'Carga recusada pelo destinatário',
  'Retorno de carga avariada',
  'Perda por atraso na entrega',
  'Carga devolvida fora de prazo',
  'Veículo parado por pane mecânica',
  'Pane seca',
  'Pane elétrica',
  'Falha de freio',
  'Falha de pneu (estouro / recapagem)',
  'Quebra de eixo / suspensão',
  'Falha em sensor de temperatura (carga refrigerada)',
  'Problema no baú isotérmico',
  'Falha humana (erro operacional)',
  'Carga sem nota / divergente fiscal',
  'Vazamento de óleo',
  'Vazamento de produto perigoso',
  'Derramamento químico',
  'Poluição do solo',
  'Poluição da água',
  'Contaminação ambiental',
  'Queima de vegetação por acidente',
  'Explosão ambiental (gás / químico)',
  'Carga perigosa derramada',
  'Resíduos contaminantes após acidente',
  'Vandalismo',
  'Sabotagem',
  'Interceptação por manifestantes',
  'Bloqueio de via / protesto',
  'Intervenção policial com dano',
  'Falha mecânica sem colisão',
  'Pane elétrica com dano em carga',
  'Sinistro durante descarga',
  'Sinistro durante armazenamento temporário',
  'Ocorrência em operação portuária',
  'Ocorrência em operação ferroviária',
  'Ocorrência em operação aérea',
  'Falha de comunicação do rastreador',
  'Violação do bloqueio remoto',
  'Perda de sinal de rastreamento',
  'Tentativa de furto com dano material',
  'Sinistro não confirmado (sem evidência de dano)',
  'Ocorrência comunicada fora do prazo',
  'Ocorrência em apuração técnica',
  'Ocorrência sem dano físico (somente tentativa)',
];

const applyMask = (name: string, value: string): string => {
  const digitsOnly = value.replace(/\D/g, '');

  switch (name) {
    case 'CPF_CNPJ_Segurado':
      if (digitsOnly.length <= 11) { // CPF
        return digitsOnly
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      } else { // CNPJ
        return digitsOnly
          .slice(0, 14)
          .replace(/(\d{2})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d)/, '$1/$2')
          .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
      }
    case 'Motorista_CPF':
      return digitsOnly
        .slice(0, 11)
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');

    case 'DAMDFE_Emissao':
    case 'CTe_Emissao':
    case 'NFe_Emissao': // Date only
      return digitsOnly
        .slice(0, 8)
        .replace(/(\d{2})(\d)/, '$1/$2')
        .replace(/(\d{2})(\d)/, '$1/$2');

    case 'Data_Hora_Evento':
    case 'Data_Hora_Comunicado': // Date and Time
      return digitsOnly
        .slice(0, 12)
        .replace(/(\d{2})(\d)/, '$1/$2')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d)/, '$1 $2')
        .replace(/(\d{4}\s\d{2})(\d)/, '$1:$2');
    
    case 'DAMDFE_Hora_Emissao':
    case 'CTe_Hora_Emissao':
    case 'NFe_Hora_Emissao': // Time only
        return digitsOnly
            .slice(0, 4)
            .replace(/(\d{2})(\d)/, '$1:$2');

    case 'Valor_Embarcado':
    case 'Valor_Estimado': {
        const cleanValue = value.replace(/\D/g, '');
        if (!cleanValue) return '';
        const numberValue = parseFloat(cleanValue) / 100;
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(numberValue);
    }

    case 'Porcentagem_Estimada': {
        const cleanValue = value.replace(/\D/g, '');
        return cleanValue ? `${cleanValue}%` : '';
    }
    
    case 'Veiculo_Placa': {
        const cleanValue = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 7);

        // Check for Mercosul format (LLLNLNN, e.g., ABC1D23)
        // The 4th character is a number and the 5th is a letter.
        if (cleanValue.length >= 5 && !isNaN(parseInt(cleanValue[3])) && isNaN(parseInt(cleanValue[4]))) {
            return cleanValue; // No hyphen for Mercosul
        }

        // Apply standard format (LLL-NNNN)
        if (cleanValue.length > 3) {
            return `${cleanValue.slice(0, 3)}-${cleanValue.slice(3)}`;
        }

        return cleanValue;
    }
        
    case 'Origem':
    case 'Destino':
    case 'Local_Evento_CidadeUF':
    case 'Local_Vistoria_CidadeUF': {
        const cleanValue = value.replace(/[^a-zA-ZÀ-ú\s/]/g, '');
        const parts = cleanValue.split('/');
        const city = parts[0];
        let state = parts.length > 1 ? parts[1] : '';

        state = state.replace(/[^a-zA-Z]/g, '').slice(0, 2).toUpperCase();

        if (parts.length > 1) {
            return `${city}/${state}`;
        }
        return city;
    }

    default:
      return value;
  }
};

const getInitialFormData = () => ({
  logoSrc: '',
  Seguradora: '',
  Apolice: '',
  Modalidade: '',
  Ramo: '',
  SEGURADO_Nome_Razao: '',
  CPF_CNPJ_Segurado: '',
  CORRETORA: '',
  SUSEP: '',
  CONTATO_Corretor: '',
  Motorista_Nome: '',
  Motorista_CPF: '',
  Motorista_CNH: '',
  Veiculo_Placa: '',
  Veiculo_Modelo: '',
  Veiculo_Cor: '',
  Origem: '',
  Destino: '',
  Tipo_Mercadoria: '',
  Valor_Embarcado: '',
  DAMDFE_N: '',
  DAMDFE_Emissao: '',
  DAMDFE_Hora_Emissao: '',
  CTe_N: '',
  CTe_Emissao: '',
  CTe_Hora_Emissao: '',
  NFe_N: '',
  NFe_Emissao: '',
  NFe_Hora_Emissao: '',
  Local_Evento_Endereco: '',
  Local_Evento_CidadeUF: '',
  Data_Hora_Evento: '',
  Local_Vistoria_Endereco: '',
  Local_Vistoria_CidadeUF: '',
  Evento: '', // Corresponds to "Natureza"
  Causa: '',
  Valor_Estimado: '',
  Porcentagem_Estimada: '',
  Nome_Comunicante: '',
  Nome_Real_Comunicante: '',
  Data_Hora_Comunicado: '',
  N_Premium: '',
});

const App: React.FC = () => {
  const [formStep, setFormStep] = useState<'form' | 'report'>('form');
  const [formData, setFormData] = useState(getInitialFormData());
  const [isOtherInsurer, setIsOtherInsurer] = useState(false);
  const [isOtherCommunicator, setIsOtherCommunicator] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const predefinedBrokers: { [key: string]: string } = {
    'INSERT CORRETORA DE SEGUROS LTDA': '202045892',
    'LRV CORRETORA DE SEGUROS LTDA': '202076446',
    'SOLO BRASIL LFRA CORRETORA DE SEGUROS LTDA': '202094545',
    'ÁGUIA CORRETORA DE SEGUROS LTDA': '202036504',
    'PIER SUL CORRETORA DE SEGUROS LTDA': '202053783',
    'HOWDEN BRASIL CONSULTORIA E CORRETORA DE SEGUROS LTDA': '202052916',
    'MMBD CORRETORA DE SEGUROS LTDA': '202018740',
  };

  const predefinedInsurers = [
    'AXA SEGUROS S.A',
    'FAIRFAX BRASIL SEGUROS CORPORATIVOS S/A',
    'SOMPO SEGUROS S.A.',
    'TOKIO MARINE SEGURADORA S.A.',
    'BERKLEY BRASIL SEGUROS S/A',
    'ALLIANZ SEGUROS S/A',
    'MAPFRE SEGUROS GERAIS S.A',
    'ZURICH BRASIL COMPANHIA DE SEGUROS',
  ];

  const modalityOptions = [
    'RODOVIÁRIO',
    'AÉREO',
    'MARÍTIMO / FLUVIAL',
    'FERROVIÁRIO',
    'MULTIMODAL / COMBINADO',
    'DUTOVIÁRIO',
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const maskedValue = applyMask(name, value);
  
    const newFormData = { ...formData, [name]: maskedValue };
  
    if (name === 'Valor_Embarcado' || name === 'Valor_Estimado') {
      const parseCurrency = (currencyString: string): number => {
        if (!currencyString) return 0;
        const numberString = currencyString.replace('R$', '').replace(/\./g, '').replace(',', '.').trim();
        return parseFloat(numberString) || 0;
      };
  
      const valorEmbarcado = parseCurrency(
        name === 'Valor_Embarcado' ? maskedValue : formData.Valor_Embarcado
      );
      const valorEstimado = parseCurrency(
        name === 'Valor_Estimado' ? maskedValue : formData.Valor_Estimado
      );
  
      if (valorEmbarcado > 0) {
        const percentage = (valorEstimado / valorEmbarcado) * 100;
        const formattedPercentage = `${percentage.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`;
        newFormData.Porcentagem_Estimada = formattedPercentage;
      } else {
        newFormData.Porcentagem_Estimada = '';
      }
    }
  
    setFormData(newFormData);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleInsurerSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedInsurer = e.target.value;
    if (selectedInsurer === 'OUTRA') {
        setIsOtherInsurer(true);
        setFormData(prev => ({ ...prev, Seguradora: '' }));
    } else {
        setIsOtherInsurer(false);
        setFormData(prev => ({ ...prev, Seguradora: selectedInsurer }));
    }
  };

  const handleCommunicatorSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (selectedValue === 'OUTROS') {
        setIsOtherCommunicator(true);
        setFormData(prev => ({ ...prev, Nome_Comunicante: '' }));
    } else {
        setIsOtherCommunicator(false);
        setFormData(prev => ({ ...prev, Nome_Comunicante: selectedValue }));
    }
  };

  const handleBrokerSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBroker = e.target.value;
    const susep = predefinedBrokers[selectedBroker];

    if (susep) {
        setFormData(prev => ({
            ...prev,
            CORRETORA: selectedBroker,
            SUSEP: susep,
        }));
    } else { // Handles "Selecione..." or "Outra"
        setFormData(prev => ({
            ...prev,
            CORRETORA: '',
            SUSEP: '',
        }));
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, logoSrc: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setFormData(prev => ({ ...prev, logoSrc: '' }));
  };

  const handleNewReport = () => {
    setFormData(getInitialFormData());
    setIsOtherInsurer(false);
    setIsOtherCommunicator(false);
    setFormStep('form');
  };

  const handleDownload = async (format: 'pdf' | 'jpg') => {
    if (!reportRef.current) return;

    const reportElement = reportRef.current;
    const originalStyle = reportElement.style.cssText; // Save original inline styles

    // Apply a fixed width to ensure consistent rendering across devices
    reportElement.style.width = '896px';

    try {
        const canvas = await html2canvas(reportElement, {
            scale: 2,
            useCORS: true, // Good practice for images
        });

        if (format === 'jpg') {
            const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = `aviso_sinistro_${formData.N_Premium || 'report'}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else if (format === 'pdf') {
            const { jsPDF } = jspdf;
            const pdf = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
            
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            const ratio = canvasWidth / canvasHeight;
            
            let imgWidth = pdfWidth - 20; // 10mm margin on each side
            let imgHeight = imgWidth / ratio;

            if (imgHeight > pdfHeight - 20) { // check if it fits height-wise
                imgHeight = pdfHeight - 20;
                imgWidth = imgHeight * ratio;
            }

            const x = (pdfWidth - imgWidth) / 2; // center horizontally
            const y = 10; // 10mm margin top
            
            const imgData = canvas.toDataURL('image/png');
            pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
            pdf.save(`aviso_sinistro_${formData.N_Premium || 'report'}.pdf`);
        }
    } catch (e) {
        console.error("Error generating file:", e);
        alert("Ocorreu um erro ao gerar o arquivo. Tente novamente.");
    }
    finally {
        // IMPORTANT: Restore original styles
        reportElement.style.cssText = originalStyle;
    }
  };

  const renderReport = () => {
    return (
    <>
      <div ref={reportRef} className="bg-white p-8">
        <Header logoSrc={formData.logoSrc} N_Premium={formData.N_Premium} onChange={handleInputChange} isForm={false}/>
        <div className="space-y-1 mt-1">
            <Section title="DADOS DO SEGURO">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                <Field label="Seguradora" tag={formData.Seguradora} />
                <Field label="Apólice" tag={formData.Apolice} />
                <Field label="Modalidade" tag={formData.Modalidade} />
                <Field label="Ramo" tag={formData.Ramo} />
                <Field label="SEGURADO: Nome/Razão Social" tag={formData.SEGURADO_Nome_Razao} />
                <Field label="CPF/CNPJ" tag={formData.CPF_CNPJ_Segurado} />
              </div>
            </Section>

            <Section title="DADOS DO CORRETOR">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
                <Field label="CORRETORA" tag={formData.CORRETORA} className="md:col-span-2" />
                <Field label="SUSEP" tag={formData.SUSEP} />
                <Field label="CONTATO" tag={formData.CONTATO_Corretor} />
              </div>
            </Section>

            <Section title="CONDUTOR E VEÍCULO SINISTRADO">
              <div className="space-y-1">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
                      <Field label="Motorista" tag={formData.Motorista_Nome} />
                      <Field label="CPF" tag={formData.Motorista_CPF} />
                      <Field label="CNH" tag={formData.Motorista_CNH} />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-700 pt-1 border-t mt-1">DADOS DO VEÍCULO</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
                      <Field label="Placa" tag={formData.Veiculo_Placa} />
                      <Field label="Modelo" tag={formData.Veiculo_Modelo} />
                      <Field label="Cor" tag={formData.Veiculo_Cor} />
                  </div>
              </div>
            </Section>

            <Section title="CRONOLOGIA DO EMBARQUE">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                  <Field label="Origem" tag={formData.Origem} />
                  <Field label="Destino" tag={formData.Destino} />
              </div>
            </Section>
            
            <Section title="IDENTIFICAÇÃO DA CARGA E DOCUMENTOS">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                  <Field label="Tipo de Mercadoria" tag={formData.Tipo_Mercadoria} />
                  <Field label="Valor Embarcado (R$)" tag={formData.Valor_Embarcado} />
              </div>
              <div className="space-y-1 mt-1 pt-1 border-t">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
                      <Field label="DAMDFE (Nº)" tag={formData.DAMDFE_N} />
                      <Field label="Data Emissão" tag={formData.DAMDFE_Emissao} />
                      <Field label="Hora Emissão" tag={formData.DAMDFE_Hora_Emissao} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
                      <Field label="CT-e (Nº)" tag={formData.CTe_N} />
                      <Field label="Data Emissão" tag={formData.CTe_Emissao} />
                      <Field label="Hora Emissão" tag={formData.CTe_Hora_Emissao} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
                      <Field label="NF-e (Nº)" tag={formData.NFe_N} />
                      <Field label="Data Emissão" tag={formData.NFe_Emissao} />
                      <Field label="Hora Emissão" tag={formData.NFe_Hora_Emissao} />
                  </div>
              </div>
            </Section>
            
            <Section title="CRONOLOGIA E LOCALIZAÇÃO DO SINISTRO">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
                    <Field label="Endereço do Evento" tag={formData.Local_Evento_Endereco} className="md:col-span-2"/>
                    <Field label="Data/Hora do Evento" tag={formData.Data_Hora_Evento} />
                    <Field label="Cidade/UF do Evento" tag={formData.Local_Evento_CidadeUF} className="md:col-span-3" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-1 border-t mt-1 pt-1">
                    <Field label="Endereço da Vistoria" tag={formData.Local_Vistoria_Endereco} className="md:col-span-2"/>
                    <Field label="Cidade/UF da Vistoria" tag={formData.Local_Vistoria_CidadeUF} />
                </div>
            </Section>
            
            <Section title="DETALHES DO SINISTRO, PERDAS EVENTO">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                    <Field label="Natureza" tag={formData.Evento} className="md:col-span-2"/>
                    <Field label="Causa (Relato da Ocorrência/Declaração)" tag={formData.Causa} className="md:col-span-2" />
                    <Field label="Valor Estimado (R$)" tag={formData.Valor_Estimado} />
                    <Field label="Porcentagem Estimada (%)" tag={formData.Porcentagem_Estimada} />
                </div>
            </Section>
            
            <Section title="INFORMAÇÕES DO COMUNICANTE">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
                <Field label="Comunicado por" tag={formData.Nome_Comunicante} />
                <Field label="Nome do Comunicante" tag={formData.Nome_Real_Comunicante} />
                <Field label="Data/Hora" tag={formData.Data_Hora_Comunicado} />
              </div>
            </Section>
          </div>
          <Footer />
      </div>
      <div className="mt-6 flex flex-wrap justify-end gap-3 p-4">
          <button onClick={handleNewReport} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Gerar Novo Relatório</button>
          <button onClick={() => handleDownload('jpg')} className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Baixar JPG</button>
          <button onClick={() => handleDownload('pdf')} className="bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Baixar PDF</button>
          <button onClick={() => setFormStep('form')} className="bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">Editar Informações</button>
      </div>
    </>
  )};
  
  const renderForm = () => (
    <div className="p-4">
        <Header logoSrc={formData.logoSrc} N_Premium={formData.N_Premium} onChange={handleInputChange} isForm={true}/>
        <div className="space-y-2 mt-2">
          
            <Section title="LOGO DA EMPRESA">
                <div className="flex flex-col items-center mt-1">
                    <label htmlFor="logo-upload" className="w-full max-w-sm h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 flex items-center justify-center p-2">
                        {formData.logoSrc ? (
                            <img src={formData.logoSrc} alt="Logo da empresa" className="max-w-full max-h-full object-contain" />
                        ) : (
                            <div className="text-center text-gray-500 p-4">
                                <svg className="mx-auto w-8 h-8 mb-2 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                </svg>
                                <p className="text-sm"><span className="font-semibold">Clique para carregar um logo</span></p>
                            </div>
                        )}
                    </label>
                    <input id="logo-upload" type="file" className="hidden" onChange={handleLogoChange} accept="image/*" />
                    {formData.logoSrc && (
                        <div className="flex gap-2 mt-2">
                            <button onClick={handleRemoveLogo} className="text-xs bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600">Remover Logo</button>
                        </div>
                    )}
                </div>
            </Section>
            
            <Section title="DADOS DO SEGURO">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                    <div>
                        <label htmlFor="seguradora-select" className="block text-xs font-medium text-gray-600">Seguradora</label>
                        <select
                            id="seguradora-select"
                            onChange={handleInsurerSelect}
                            value={isOtherInsurer ? 'OUTRA' : formData.Seguradora}
                            className="h-5 px-1 w-full border-0 border-b border-gray-400 bg-gray-50 focus:ring-0 focus:border-blue-600 text-sm text-gray-800"
                        >
                            <option value="">Selecione...</option>
                            {predefinedInsurers.map(name => (
                                <option key={name} value={name}>{name}</option>
                            ))}
                            <option value="OUTRA">Outra (preencher manualmente)</option>
                        </select>
                        {isOtherInsurer && (
                           <input
                                type="text"
                                name="Seguradora"
                                value={formData.Seguradora}
                                onChange={handleInputChange}
                                placeholder="Digite o nome da seguradora"
                                className="mt-1 h-5 px-1 w-full border-0 border-b border-gray-400 bg-gray-50 focus:ring-0 focus:border-blue-600 text-sm text-gray-800"
                           />
                        )}
                    </div>
                    <InputField label="Apólice" name="Apolice" value={formData.Apolice} onChange={handleInputChange} />
                    <div>
                        <label htmlFor="Modalidade" className="block text-xs font-medium text-gray-600">Modalidade</label>
                        <select
                            id="Modalidade"
                            name="Modalidade"
                            value={formData.Modalidade}
                            onChange={handleSelectChange}
                            className="h-5 px-1 w-full border-0 border-b border-gray-400 bg-gray-50 focus:ring-0 focus:border-blue-600 text-sm text-gray-800"
                        >
                            <option value="">Selecione...</option>
                            {modalityOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="Ramo" className="block text-xs font-medium text-gray-600">Ramo</label>
                        <select
                            id="Ramo"
                            name="Ramo"
                            value={formData.Ramo}
                            onChange={handleSelectChange}
                            className="h-5 px-1 w-full border-0 border-b border-gray-400 bg-gray-50 focus:ring-0 focus:border-blue-600 text-sm text-gray-800"
                        >
                            <option value="">Selecione...</option>
                            <option value="RCTR-C">RCTR-C</option>
                            <option value="RCF-DC">RCF-DC</option>
                            <option value="TRANSPORTE_INTERNACIONAL">TRANSPORTE_INTERNACIONAL</option>
                            <option value="TRANSPORTE_NACIONAL">TRANSPORTE_NACIONAL</option>
                            <option value="RCTR-VI">RCTR-VI</option>
                        </select>
                    </div>
                    <InputField label="SEGURADO: Nome/Razão Social" name="SEGURADO_Nome_Razao" value={formData.SEGURADO_Nome_Razao} onChange={handleInputChange} />
                    <InputField label="CPF/CNPJ" name="CPF_CNPJ_Segurado" value={formData.CPF_CNPJ_Segurado} onChange={handleInputChange} placeholder="00.000.000/0000-00"/>
                </div>
            </Section>

            <Section title="DADOS DO CORRETOR">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-2">
                  <div className="md:col-span-3">
                      <label htmlFor="corretora-select" className="block text-xs font-medium text-gray-600">Selecionar Corretora (Preenchimento Rápido)</label>
                      <select
                          id="corretora-select"
                          onChange={handleBrokerSelect}
                          defaultValue=""
                          className="h-5 px-1 w-full border-0 border-b border-gray-400 bg-gray-50 focus:ring-0 focus:border-blue-600 text-sm text-gray-800"
                      >
                          <option value="">Selecione...</option>
                          {Object.keys(predefinedBrokers).map(name => (
                              <option key={name} value={name}>{name}</option>
                          ))}
                          <option value="OUTRA">Outra (preencher manualmente)</option>
                      </select>
                  </div>
                  <InputField label="CORRETORA" name="CORRETORA" value={formData.CORRETORA} onChange={handleInputChange} />
                  <InputField label="SUSEP" name="SUSEP" value={formData.SUSEP} onChange={handleInputChange} />
                  <InputField label="CONTATO" name="CONTATO_Corretor" value={formData.CONTATO_Corretor} onChange={handleInputChange} />
              </div>
            </Section>

            <Section title="CONDUTOR E VEÍCULO SINISTRADO">
                <div className="space-y-1">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-1">
                        <InputField label="Motorista" name="Motorista_Nome" value={formData.Motorista_Nome} onChange={handleInputChange} />
                        <InputField label="CPF" name="Motorista_CPF" value={formData.Motorista_CPF} onChange={handleInputChange} placeholder="000.000.000-00"/>
                        <InputField label="CNH" name="Motorista_CNH" value={formData.Motorista_CNH} onChange={handleInputChange} />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-700 pt-1 border-t mt-1">DADOS DO VEÍCULO</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-1">
                        <InputField label="Placa" name="Veiculo_Placa" value={formData.Veiculo_Placa} onChange={handleInputChange} placeholder="ABC-1234 ou ABC1D23" />
                        <InputField label="Modelo" name="Veiculo_Modelo" value={formData.Veiculo_Modelo} onChange={handleInputChange} />
                        <InputField label="Cor" name="Veiculo_Cor" value={formData.Veiculo_Cor} onChange={handleInputChange} />
                    </div>
                </div>
            </Section>

            <Section title="CRONOLOGIA DO EMBARQUE">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                    <InputField label="Origem" name="Origem" value={formData.Origem} onChange={handleInputChange} placeholder="Cidade/UF"/>
                    <InputField label="Destino" name="Destino" value={formData.Destino} onChange={handleInputChange} placeholder="Cidade/UF"/>
                </div>
            </Section>
            
            <Section title="IDENTIFICAÇÃO DA CARGA E DOCUMENTOS">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                    <InputField label="Tipo de Mercadoria" name="Tipo_Mercadoria" value={formData.Tipo_Mercadoria} onChange={handleInputChange} />
                    <InputField label="Valor Embarcado (R$)" name="Valor_Embarcado" value={formData.Valor_Embarcado} onChange={handleInputChange} placeholder="R$ 0,00"/>
                </div>
                <div className="space-y-2 mt-2 pt-2 border-t">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-1 items-end">
                        <InputField label="DAMDFE (Nº)" name="DAMDFE_N" value={formData.DAMDFE_N} onChange={handleInputChange} />
                        <InputField label="Data Emissão" name="DAMDFE_Emissao" value={formData.DAMDFE_Emissao} onChange={handleInputChange} placeholder="dd/mm/aaaa"/>
                        <InputField label="Hora Emissão" name="DAMDFE_Hora_Emissao" value={formData.DAMDFE_Hora_Emissao} onChange={handleInputChange} placeholder="HH:mm"/>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-1 items-end">
                        <InputField label="CT-e (Nº)" name="CTe_N" value={formData.CTe_N} onChange={handleInputChange} />
                        <InputField label="Data Emissão" name="CTe_Emissao" value={formData.CTe_Emissao} onChange={handleInputChange} placeholder="dd/mm/aaaa"/>
                        <InputField label="Hora Emissão" name="CTe_Hora_Emissao" value={formData.CTe_Hora_Emissao} onChange={handleInputChange} placeholder="HH:mm"/>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-1 items-end">
                        <InputField label="NF-e (Nº)" name="NFe_N" value={formData.NFe_N} onChange={handleInputChange} />
                        <InputField label="Data Emissão" name="NFe_Emissao" value={formData.NFe_Emissao} onChange={handleInputChange} placeholder="dd/mm/aaaa"/>
                        <InputField label="Hora Emissão" name="NFe_Hora_Emissao" value={formData.NFe_Hora_Emissao} onChange={handleInputChange} placeholder="HH:mm"/>
                    </div>
                </div>
            </Section>
            
            <Section title="CRONOLOGIA E LOCALIZAÇÃO DO SINISTRO">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                    <InputField label="Endereço do Evento" name="Local_Evento_Endereco" value={formData.Local_Evento_Endereco} onChange={handleInputChange} />
                    <InputField label="Cidade/UF do Evento" name="Local_Evento_CidadeUF" value={formData.Local_Evento_CidadeUF} onChange={handleInputChange} placeholder="Cidade/UF" />
                    <InputField label="Data/Hora do Evento" name="Data_Hora_Evento" value={formData.Data_Hora_Evento} onChange={handleInputChange} placeholder="dd/mm/aaaa HH:mm" />
                    <InputField label="Endereço da Vistoria" name="Local_Vistoria_Endereco" value={formData.Local_Vistoria_Endereco} onChange={handleInputChange} />
                    <InputField label="Cidade/UF da Vistoria" name="Local_Vistoria_CidadeUF" value={formData.Local_Vistoria_CidadeUF} onChange={handleInputChange} placeholder="Cidade/UF" />
                </div>
            </Section>
            
            <Section title="DETALHES DO SINISTRO, PERDAS EVENTO">
                <div className="grid grid-cols-1 gap-y-1">
                    <div className="col-span-1 md:col-span-2">
                        <label htmlFor="Evento" className="block text-xs font-medium text-gray-600">Natureza</label>
                        <select
                            id="Evento"
                            name="Evento"
                            value={formData.Evento}
                            onChange={handleSelectChange}
                            className="h-5 px-1 w-full border-0 border-b border-gray-400 bg-gray-50 focus:ring-0 focus:border-blue-600 text-sm text-gray-800"
                        >
                            <option value="">Selecione...</option>
                            {naturezaOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                    <InputField 
                      label="Causa (Relato da Ocorrência/Declaração)" 
                      name="Causa" 
                      value={formData.Causa} 
                      onChange={handleInputChange} 
                      fullWidth={true}
                      spellCheck={true}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 pt-2">
                        <InputField label="Valor Estimado (R$)" name="Valor_Estimado" value={formData.Valor_Estimado} onChange={handleInputChange} placeholder="R$ 0,00"/>
                        <InputField label="Porcentagem Estimada (%)" name="Porcentagem_Estimada" value={formData.Porcentagem_Estimada} onChange={handleInputChange} placeholder="Calculado automaticamente"/>
                    </div>
                </div>
            </Section>
            
            <Section title="INFORMAÇÕES DO COMUNICANTE">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-2">
                    <div>
                        <label htmlFor="comunicado-por-select" className="block text-xs font-medium text-gray-600">Comunicado por</label>
                        <select
                            id="comunicado-por-select"
                            onChange={handleCommunicatorSelect}
                            value={isOtherCommunicator ? 'OUTROS' : formData.Nome_Comunicante}
                            className="h-5 px-1 w-full border-0 border-b border-gray-400 bg-gray-50 focus:ring-0 focus:border-blue-600 text-sm text-gray-800"
                        >
                            <option value="">Selecione...</option>
                            <option value="CORRETOR">CORRETOR</option>
                            <option value="SEGURADO">SEGURADO</option>
                            <option value="MOTORISTA">MOTORISTA</option>
                            <option value="OUTROS">OUTROS (PREENCHER MANUALMENTE)</option>
                        </select>
                        {isOtherCommunicator && (
                           <input
                                type="text"
                                name="Nome_Comunicante"
                                value={formData.Nome_Comunicante}
                                onChange={handleInputChange}
                                placeholder="Especifique"
                                className="mt-1 h-5 px-1 w-full border-0 border-b border-gray-400 bg-gray-50 focus:ring-0 focus:border-blue-600 text-sm text-gray-800"
                           />
                        )}
                    </div>
                    <InputField label="Nome do Comunicante" name="Nome_Real_Comunicante" value={formData.Nome_Real_Comunicante} onChange={handleInputChange} />
                    <InputField label="Data/Hora" name="Data_Hora_Comunicado" value={formData.Data_Hora_Comunicado} onChange={handleInputChange} placeholder="dd/mm/aaaa HH:mm"/>
                </div>
            </Section>
        </div>
        <div className="mt-6 flex justify-end gap-3">
            <button onClick={() => setFormStep('report')} className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Gerar Relatório
            </button>
        </div>
    </div>
  );

  return (
    <div className="container mx-auto max-w-4xl p-4 font-sans">
      <div className="bg-white rounded-lg shadow-2xl">
        {formStep === 'form' ? renderForm() : renderReport()}
      </div>
    </div>
  );
};

export default App;
