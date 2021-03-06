import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';

import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.colors.BACKGROUND};
`;

export const Title = styled.Text`
  font-size: ${RFValue(24)}px;
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.TITLE};
`;

export const Content = styled.View`
  flex: 1;
`;

export const ContainerSteps = styled.View`
  margin-top: 10px;
`;
