import type { NextApiRequest, NextApiResponse } from 'next';

import type { Company } from '../../lib/prisma';
import { getCompanies, getCompanyCount } from '../../lib/companies';

type Data = {
  message?: string;
  companies?: Company[];
  total?: number;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }

  let params = null;
  try {
    params = JSON.parse(req.body);
  } catch {
    res.status(500).send({ message: 'Only JSON allowed' });
    return;
  }

  const companies = await getCompanies(params);
  const total = await getCompanyCount(params);

  res.status(200).json({
    companies,
    total,
  });
}

export default handler;
